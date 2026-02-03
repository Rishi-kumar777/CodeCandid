import "dotenv/config";
import express from "express";
import { createGeminiClient, messagesToContents } from "../src/components/chatbot/api_setting.js";

const app = express();
const PORT = process.env.PORT || 8787;

app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/chat", async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Missing GEMINI_API_KEY" });
    }

    const { messages } = req.body || {};
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Messages array is required" });
    }

    const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
    const ai = createGeminiClient(apiKey);
    const { context } = req.body || {};
    const contextText = context
      ? [
          "Context for the simulator:",
          context.algorithm ? `Algorithm: ${context.algorithm}` : "",
          context.language ? `Language: ${context.language}` : "",
          Number.isFinite(context.stepLine) ? `Active line: ${context.stepLine}` : "",
          context.stepDesc ? `Step: ${context.stepDesc}` : "",
          context.codeSnippet ? `Code snippet:\n${context.codeSnippet}` : "",
        ]
          .filter(Boolean)
          .join("\n")
      : "";

    const combinedMessages = contextText
      ? [{ role: "user", content: contextText }, ...messages]
      : messages;

    const contents = messagesToContents(combinedMessages);

    const response = await ai.models.generateContent({
      model,
      contents,
    });

    const outputText =
      response?.text ||
      response?.candidates?.[0]?.content?.parts?.map((p) => p?.text || "").join("") ||
      "";

    return res.json({ text: outputText });
  } catch (err) {
    return res.status(500).json({ error: err?.message || "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});

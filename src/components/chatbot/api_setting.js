import { GoogleGenAI } from "@google/genai";

export function createGeminiClient(apiKey) {
  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY");
  }
  return new GoogleGenAI({ apiKey });
}

export function messagesToContents(messages) {
  return (messages || []).map((m) => ({
    role: m?.role === "assistant" ? "model" : "user",
    parts: [{ text: String(m?.content ?? "") }],
  }));
}

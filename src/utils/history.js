const historyKey = (userId) => `cc_history_${userId}`;

const readJson = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
};

const writeJson = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const makeId = () => `hist_${Date.now()}_${Math.random().toString(16).slice(2)}`;

export const getHistory = (userId) => {
  if (!userId) return [];
  return readJson(historyKey(userId), []);
};

export const addHistoryEntry = (userId, entry) => {
  if (!userId || !entry) return;
  const history = getHistory(userId);
  const nextEntry = {
    id: makeId(),
    algorithm: entry.algorithm,
    name: entry.name,
    type: entry.type || "",
    at: new Date().toISOString(),
  };

  const idx = history.findIndex((h) => h.algorithm === entry.algorithm);
  if (idx >= 0) history.splice(idx, 1);
  history.unshift(nextEntry);

  writeJson(historyKey(userId), history.slice(0, 30));
};

export const clearHistory = (userId) => {
  if (!userId) return;
  localStorage.removeItem(historyKey(userId));
};

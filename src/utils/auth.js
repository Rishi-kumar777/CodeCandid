const USERS_KEY = "cc_users";
const CURRENT_KEY = "cc_current_user";

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

const normalizeEmail = (email) => String(email || "").trim().toLowerCase();

const makeId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `user_${Date.now()}_${Math.random().toString(16).slice(2)}`;
};

export const getUsers = () => readJson(USERS_KEY, []);

export const getCurrentUser = () => readJson(CURRENT_KEY, null);

export const registerUser = (name, email, password) => {
  const cleanName = String(name || "").trim();
  const cleanEmail = normalizeEmail(email);
  const cleanPassword = String(password || "");

  if (!cleanName || !cleanEmail || !cleanPassword) {
    throw new Error("Name, email, and password are required.");
  }

  const users = getUsers();
  const exists = users.some((u) => u.email === cleanEmail);
  if (exists) throw new Error("An account with this email already exists.");

  const user = {
    id: makeId(),
    name: cleanName,
    email: cleanEmail,
    password: cleanPassword,
    createdAt: new Date().toISOString(),
  };

  const next = [...users, user];
  writeJson(USERS_KEY, next);
  writeJson(CURRENT_KEY, user);
  return user;
};

export const loginUser = (email, password) => {
  const cleanEmail = normalizeEmail(email);
  const cleanPassword = String(password || "");
  const users = getUsers();
  const user = users.find((u) => u.email === cleanEmail && u.password === cleanPassword);
  if (!user) throw new Error("Invalid email or password.");
  writeJson(CURRENT_KEY, user);
  return user;
};

export const logoutUser = () => {
  localStorage.removeItem(CURRENT_KEY);
};

import { createContext, useContext, useMemo, useState } from "react";
import { getCurrentUser, loginUser, logoutUser, registerUser } from "../utils/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getCurrentUser());
  const [ready] = useState(true);

  const login = (email, password) => {
    const next = loginUser(email, password);
    setUser(next);
    return next;
  };

  const register = (name, email, password) => {
    const next = registerUser(name, email, password);
    setUser(next);
    return next;
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      ready,
      login,
      register,
      logout,
    }),
    [user, ready]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

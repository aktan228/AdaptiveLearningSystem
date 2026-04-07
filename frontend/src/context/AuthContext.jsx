import { createContext, useContext, useState } from "react";
import { mockUser } from "../mock/user";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // null = logged out, mockUser object = logged in
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // Mock: accept any non-empty credentials
    if (email && password) {
      setUser(mockUser);
      return true;
    }
    return false;
  };

  const register = (username, email, password) => {
    if (username && email && password) {
      setUser({ ...mockUser, username, email });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
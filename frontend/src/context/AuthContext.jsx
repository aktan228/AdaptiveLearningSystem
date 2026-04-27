import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../lib/api";
import {
  AUTH_LOGOUT_EVENT,
  clearStoredTokens,
  getStoredAccessToken,
  setStoredTokens,
} from "../lib/authStorage";
import { parseApiError } from "../lib/apiErrors";

const AuthContext = createContext(null);

function normalizeUser(rawUser) {
  if (!rawUser) {
    return null;
  }

  const username = rawUser.username ?? "user";
  const displayName = rawUser.display_name ?? rawUser.full_name ?? username;

  return {
    ...rawUser,
    username,
    email: rawUser.email ?? "",
    full_name: rawUser.full_name ?? displayName,
    display_name: rawUser.display_name ?? displayName,
    avatar_url: rawUser.avatar_url ?? null,
    bio: rawUser.bio ?? "",
    role: rawUser.role ?? "student",
    created_at: rawUser.created_at ?? null,
    joined_at: rawUser.joined_at ?? rawUser.created_at ?? new Date().toISOString(),
    threshold_easy: rawUser.threshold_easy ?? 0.4,
    threshold_hard: rawUser.threshold_hard ?? 0.8,
    target_role: rawUser.target_role ?? "Python Learner",
    location: rawUser.location ?? "Not specified",
    weekly_goal: rawUser.weekly_goal ?? 5,
    lessons_completed: rawUser.lessons_completed ?? 0,
    current_streak: rawUser.current_streak ?? 0,
    max_streak: rawUser.max_streak ?? 0,
    focus_topics: rawUser.focus_topics ?? [],
    badges: rawUser.badges ?? [],
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCurrentUser = async () => {
    const response = await api.get("/api/users/me/");
    return normalizeUser(response.data);
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const accessToken = getStoredAccessToken();
      if (!accessToken) {
        setIsLoading(false);
        return;
      }

      try {
        const currentUser = await fetchCurrentUser();
        setUser(currentUser);
      } catch (error) {
        clearStoredTokens();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  useEffect(() => {
    const handleForcedLogout = () => {
      setUser(null);
    };

    window.addEventListener(AUTH_LOGOUT_EVENT, handleForcedLogout);
    return () => {
      window.removeEventListener(AUTH_LOGOUT_EVENT, handleForcedLogout);
    };
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post("/api/users/login/", { email, password });
      const { access, refresh, user: responseUser } = response.data;

      setStoredTokens(access, refresh);
      setUser(responseUser ? normalizeUser(responseUser) : await fetchCurrentUser());
      return { success: true };
    } catch (error) {
      const { message, fieldErrors } = parseApiError(error, "Login failed");
      return { success: false, error: message, fieldErrors };
    }
  };

  const register = async (username, email, password) => {
    try {
      await api.post("/api/users/register/", { username, email, password });
      return await login(email, password);
    } catch (error) {
      const { message, fieldErrors } = parseApiError(error, "Registration failed");
      return { success: false, error: message, fieldErrors };
    }
  };

  const logout = () => {
    clearStoredTokens();
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      isLoading,
      login,
      register,
      logout,
      accessToken: getStoredAccessToken(),
    }),
    [user, isLoading],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

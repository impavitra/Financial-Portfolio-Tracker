import { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../services/api";

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Verify token is still valid
      authAPI
        .verifyToken()
        .then(() => {
          const userData = JSON.parse(localStorage.getItem("user") || "{}");
          setUser(userData);
        })
        .catch(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await authAPI.login(username, password);
      const { token, username: userUsername } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ username: userUsername }));
      setUser({ username: userUsername });

      return response;
    } catch (error) {
      throw error;
    }
  };

  const register = async (username, password, email) => {
    try {
      const response = await authAPI.register(username, password, email);
      const { token, username: userUsername } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ username: userUsername }));
      setUser({ username: userUsername });

      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

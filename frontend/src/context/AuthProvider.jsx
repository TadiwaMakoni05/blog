import React, { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      // Usually fetch current user profile
      fetchProfile(token);
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchProfile = async (accessToken) => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/api/users/profile/me/",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );
      setUser(res.data);
    } catch (error) {
      console.error("Failed to fetch profile", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = (tokens) => {
    localStorage.setItem("access_token", tokens.access);
    localStorage.setItem("refresh_token", tokens.refresh);
    setToken(tokens.access);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, token, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

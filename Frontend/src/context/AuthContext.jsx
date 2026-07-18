import {
  createContext,
  useContext,
  useState,
} from "react";
import { getCurrentUser } from "../services/authService";

const AuthContext =
  createContext(null);

function readStoredAuth() {
  const savedUser =
    localStorage.getItem(
      "collex_user"
    );
  const token =
    localStorage.getItem("token");

  if (!savedUser && !token) {
    return null;
  }

  try {
    const parsed = savedUser
      ? JSON.parse(savedUser)
      : {};

    if (parsed.user) {
      return parsed;
    }

    return {
      token: parsed.token || token,
      user: parsed,
    };
  } catch {
    return token ? { token, user: null } : null;
  }
}

export function AuthProvider({
  children,
}) {
  const [user, setUser] =
    useState(readStoredAuth);

  const login = (userData) => {
    const authData = userData.user
      ? userData
      : {
          token: userData.token,
          user: userData,
        };

    localStorage.setItem(
      "collex_user",
      JSON.stringify(authData)
    );

    localStorage.setItem(
      "token",
      authData.token
    );

    setUser(authData);
  };

  const logout = () => {
    localStorage.removeItem(
      "collex_user"
    );
    localStorage.removeItem(
      "token"
    );

    setUser(null);
  };

  const refreshUser = async () => {
    const token =
      localStorage.getItem("token");

    if (!token) {
      return null;
    }

    const data = await getCurrentUser(token);
    const authData = {
      token,
      user: data.user,
    };

    localStorage.setItem(
      "collex_user",
      JSON.stringify(authData)
    );
    setUser(authData);

    return data.user;
  };

  const currentUser = user?.user || null;

  return (
    <AuthContext.Provider
      value={{
        user,
        currentUser,
        token: user?.token || "",
        userEmail: currentUser?.email || "",
        userName: currentUser?.name || "",
        verificationStatus:
          currentUser?.verificationStatus || "",
        isLoggedIn: !!user,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(
    AuthContext
  );
}

import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [userEmail, setUserEmail] = useState(() =>
    localStorage.getItem("collex_user")
  );

  const login = (email) => {
    localStorage.setItem("collex_user", email);
    setUserEmail(email);
  };

  const logout = () => {
    localStorage.removeItem("collex_user");
    setUserEmail(null);
  };

  return (
    <AuthContext.Provider
      value={{ userEmail, isLoggedIn: !!userEmail, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

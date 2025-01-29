import React, { createContext, useState, useContext } from "react";

interface AuthContextProps {
  token: string | null;
  loginContext: (token: string) => void;
  logoutContext: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  token: null,
  loginContext: () => {},
  logoutContext: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  const loginContext = (token: string) => {
    setToken(token);
    localStorage.setItem("authToken", token);
  };

  const logoutContext = () => {
    setToken(null);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ token, loginContext, logoutContext }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

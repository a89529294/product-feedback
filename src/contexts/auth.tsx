import * as React from "react";
import { apiURL } from "../lib";

type Status = "idle" | "validating";

export interface AuthContext {
  isAuthenticated: boolean;
  signup: (formData: FormData) => Promise<void>;
  login: (username: string) => Promise<void>;
  logout: () => Promise<void>;
  user: string | null;
}

const AuthContext = React.createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = React.useState<Status>("idle");
  const [user, setUser] = React.useState<string | null>(null);
  const isAuthenticated = !!user;

  const signup = React.useCallback(async (formData: FormData) => {
    const res = await fetch(`${apiURL}/signup`, {
      method: "POST",
      body: JSON.stringify({
        username: formData.get("username"),
        password: formData.get("password"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) console.log(res.status);
    else {
      setUser(formData.get("username") as string);
    }
  }, []);

  const logout = React.useCallback(async () => {
    setUser(null);
  }, []);

  const login = React.useCallback(async (username: string) => {
    setUser(username);
  }, []);

  React.useEffect(() => {
    (async () => {
      setStatus("validating");
      const res = await fetch(`${apiURL}/validate-session`);
      setStatus("idle");
      if (!res.ok) setUser(null);
      else {
        const data = await res.json();
        setUser(data.username);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, signup }}
    >
      {status === "idle" ? children : null}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

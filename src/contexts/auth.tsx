import * as React from "react";
import { apiURL } from "../lib";

type Status = "idle" | "validating";

export interface AuthContext {
  isAuthenticated: boolean;
  signup: (formData: FormData) => Promise<void>;
  signin: (formData: FormData) => Promise<void>;
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

  const signin = React.useCallback(async (formData: FormData) => {
    const res = await fetch(`${apiURL}/signin`, {
      method: "POST",
      body: JSON.stringify({
        username: formData.get("username"),
        password: formData.get("password"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // try removing this
    });

    if (!res.ok) console.log(res.status);
    else {
      setUser(formData.get("username") as string);
    }
  }, []);

  React.useEffect(() => {
    (async () => {
      setStatus("validating");
      const href = window.location.pathname;
      console.log(href);
      const res = await fetch(`${apiURL}/validate-session`, {
        credentials: "include",
      });
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
      value={{ isAuthenticated, user, signin, logout, signup }}
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

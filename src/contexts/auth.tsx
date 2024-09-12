import * as React from "react";
import { apiURL } from "../lib";
import { flushSync } from "react-dom";

export interface AuthContext {
  isAuthenticated: boolean;
  isEmailVerified: boolean;
  signup: (formData: FormData) => Promise<void | string>;
  signin: (formData: FormData) => Promise<void | string>;
  signout: () => Promise<void>;
  verifyEmail: (verificationCode: string) => Promise<void | string>;
  sendVerificationEmail: (email: string) => Promise<void | string>;
  user: string | null;
}

const AuthContext = React.createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isEmailVerified, setIsEmailVerified] = React.useState(false);
  const [user, setUser] = React.useState<string | null>(null);
  const isAuthenticated = !!user;

  const sendVerificationEmail = React.useCallback(async (email: string) => {
    const res = await fetch(`${apiURL}/resend-email-verification-code`, {
      method: "POST",
      body: JSON.stringify({
        email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const { message } = await res.json();

    if (!res.ok) return message;
  }, []);

  const signup = React.useCallback(async (formData: FormData) => {
    const res = await fetch(`${apiURL}/signup`, {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!res.ok) {
      const { message } = await res.json();
      return message;
    } else {
      flushSync(() => {
        setUser(formData.get("email") as string);
        setIsEmailVerified(false);
      });
    }
  }, []);

  const signout = React.useCallback(async () => {
    await fetch(`${apiURL}/signout`, {
      method: "POST",
      credentials: "include",
    });

    flushSync(() => {
      setUser(null);
      setIsEmailVerified(false);
    });
  }, []);

  const signin = React.useCallback(
    async (formData: FormData) => {
      const res = await fetch(`${apiURL}/signin`, {
        method: "POST",
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!res.ok) {
        const { message } = await res.json();
        return message;
      } else {
        const data = await res.json();

        if (!data.emailVerified) {
          sendVerificationEmail(formData.get("email") as string);
        }

        flushSync(() => {
          setUser(data.email);
          setIsEmailVerified(data.emailVerified);
        });
      }
    },
    [sendVerificationEmail]
  );

  const verifyEmail = React.useCallback(async (verificationCode: string) => {
    const res = await fetch(`${apiURL}/email-verification`, {
      method: "POST",
      body: JSON.stringify({
        verificationCode,
      }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const { message } = await res.json();
      return message;
    } else {
      flushSync(() => {
        setIsEmailVerified(true);
      });
    }
  }, []);

  React.useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${apiURL}/validate-session`, {
          credentials: "include",
        });

        if (!res.ok) setUser(null);
        else {
          const data = await res.json();
          flushSync(() => {
            setUser(data.email);
            setIsEmailVerified(data.emailVerified);
          });
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isEmailVerified,
        user,
        signin,
        signout,
        signup,
        verifyEmail,
        sendVerificationEmail,
      }}
    >
      {children}
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

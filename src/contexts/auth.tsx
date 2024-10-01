import * as React from "react";
import { apiURL } from "../lib";
import { flushSync } from "react-dom";

export type User =
  | {
      type: "email";
      email: string;
      isEmailVerified: boolean;
    }
  | {
      type: "github";
      username: string;
    }
  | {
      type: "google";
      username: string;
    }
  | {
      type: "signedOut";
    };

export interface AuthContext {
  isAuthenticated: boolean;
  isNeedingEmailVerification: boolean;
  isSubmitting: boolean;
  signup: (email: string, password: string) => Promise<void | string>;
  signin: (email: string, password: string) => Promise<void | string>;
  signout: () => Promise<void>;
  verifyEmail: (verificationCode: string) => Promise<void | string>;
  sendVerificationEmail: (email: string) => Promise<void | string>;
  resetPassword: (
    email: string
  ) => Promise<{ errorMessage: string } | { successMessage: string }>;
  replacePassword: (
    newPassword: string,
    token: string
  ) => Promise<{ errorMessage: string } | { successMessage: string }>;
  user: User;
  username: string;
}

const AuthContext = React.createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [user, setUser] = React.useState<User>({
    type: "signedOut",
  });
  const authType = user.type;
  const isAuthenticated = user.type !== "signedOut";
  const isNeedingEmailVerification =
    user.type === "email" && !user.isEmailVerified;

  const replacePassword = React.useCallback(
    async (newPassword: string, token: string) => {
      setIsSubmitting(true);

      const res = await fetch(`${apiURL}/reset-password/${token}`, {
        method: "POST",
        body: JSON.stringify({
          password: newPassword,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const { message } = await res.json();

      setIsSubmitting(false);

      if (!res.ok)
        return {
          errorMessage: message,
        };
      return {
        successMessage: message,
      };
    },
    []
  );

  const resetPassword = React.useCallback(async (email: string) => {
    setIsSubmitting(true);
    const res = await fetch(`${apiURL}/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
      credentials: "include",
    });

    const { message } = await res.json();

    setIsSubmitting(false);

    if (!res.ok) return { errorMessage: message };

    return { successMessage: message };
  }, []);

  const sendVerificationEmail = React.useCallback(async (email: string) => {
    setIsSubmitting(true);
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
    setIsSubmitting(false);

    if (!res.ok) return message;
  }, []);

  const signup = React.useCallback(async (email: string, password: string) => {
    setIsSubmitting(true);
    const res = await fetch(`${apiURL}/signup`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    setIsSubmitting(false);

    if (!res.ok) {
      const { message } = await res.json();
      return message;
    } else {
      flushSync(() => {
        setUser({
          type: "email",
          email,
          isEmailVerified: false,
        });
      });
    }
  }, []);

  const signout = React.useCallback(async () => {
    setIsSubmitting(true);
    await fetch(`${apiURL}/signout`, {
      method: "POST",
      credentials: "include",
    });
    setIsSubmitting(false);

    flushSync(() => {
      setUser({
        type: "signedOut",
      });
    });
  }, []);

  const signin = React.useCallback(
    async (email: string, password: string) => {
      setIsSubmitting(true);
      const res = await fetch(`${apiURL}/signin`, {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!res.ok) {
        const { message } = await res.json();
        setIsSubmitting(false);
        return message;
      } else {
        const data = await res.json();
        setIsSubmitting(false);

        if (!data.emailVerified) {
          sendVerificationEmail(email);
        }

        flushSync(() => {
          setUser({
            type: "email",
            email: data.email,
            isEmailVerified: data.isEmailVerified,
          });
        });
      }
    },
    [sendVerificationEmail]
  );

  const verifyEmail = React.useCallback(
    async (verificationCode: string) => {
      if (authType !== "email") return;

      setIsSubmitting(true);
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
      setIsSubmitting(false);

      if (!res.ok) {
        const { message } = await res.json();
        return message;
      } else {
        flushSync(() => {
          setUser({
            ...user,
            isEmailVerified: true,
          });
        });
      }
    },
    [authType, user]
  );

  React.useEffect(() => {
    (async () => {
      setIsSubmitting(true);
      try {
        const res = await fetch(`${apiURL}/validate-session`, {
          credentials: "include",
        });

        if (!res.ok) setUser({ type: "signedOut" });
        else {
          const data = await res.json();
          flushSync(() => {
            // email/password signin
            if (data.email) {
              setUser({
                type: "email",
                email: data.email,
                isEmailVerified: data.isEmailVerified,
              });
            }

            // oauth signin
            if (data.oauthProviderName) {
              setUser({
                type: data.oauthProviderName,
                username: data.username,
              });
            }
          });
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsSubmitting(false);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isNeedingEmailVerification,
        isSubmitting,
        user,
        signin,
        signout,
        signup,
        verifyEmail,
        sendVerificationEmail,
        resetPassword,
        replacePassword,
        username:
          user.type === "signedOut"
            ? ""
            : user.type === "email"
              ? user.email
              : user.username,
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

import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../contexts/auth";

export const Route = createFileRoute("/verify-email")({
  beforeLoad: ({
    context: {
      auth: { isAuthenticated, isEmailVerified },
    },
  }) => {
    if (isAuthenticated && isEmailVerified) {
      throw redirect({ to: "/feedback" });
    }

    if (!isAuthenticated) throw redirect({ to: "/signin" });
  },
  component: () => <EmailVerification />,
});

export default function EmailVerification() {
  const router = useRouter();
  const navigate = Route.useNavigate();
  const { verifyEmail, user, signout, sendVerificationEmail } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tryAgainDuration, setTryAgainDuration] = useState(0);
  const [code, setCode] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    setIsSubmitting(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const errorMessage = await verifyEmail(
      formData.get("verificationCode") as string
    );
    setIsSubmitting(false);
    if (errorMessage) {
      setCode("");
      inputRef.current!.focus();
      return toast.error(errorMessage);
    }

    await router.invalidate();

    await navigate({ to: "/feedback" });
  };

  const backToSignup = async () => {
    await signout();

    navigate({ to: "/signup" });
  };

  const resendVerificationEmail = async () => {
    setTryAgainDuration(15);
    const intervalId = setInterval(() => {
      setTryAgainDuration((duration) => {
        if (duration > 1) return --duration;

        clearInterval(intervalId);
        return 0;
      });
    }, 1000);

    const message = await sendVerificationEmail(user!);

    if (message) {
      toast.error(message);
      setTryAgainDuration(0);
    } else {
      toast.success("Email sent");
    }
  };

  return (
    <main className="flex items-center h-screen">
      <div className="mx-auto w-80 md:w-96">
        <h1 className="mb-4 text-2xl font-bold text-center">
          Welcome to <span className="text-primary">Product Feedback</span>
        </h1>
        <h2 className="mb-8 text-xl font-bold text-center">
          Verify your email at{" "}
          <span className="text-lg text-slate-500">{user}</span>
        </h2>

        <form onSubmit={onSubmit}>
          <fieldset className="space-y-8">
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">Verification Code</span>
              <input
                type="text"
                className="w-full h-10 border border-transparent rounded-md focus:ring-0 focus:border-secondary-blue bg-pale-grey"
                name="verificationCode"
                placeholder="Enter 8-digit code"
                maxLength={8}
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                ref={inputRef}
              />
            </label>
          </fieldset>

          <fieldset className="mt-8">
            <button
              type="submit"
              className="w-full h-10 text-white rounded-md bg-primary disabled:opacity-50"
              disabled={isSubmitting}
            >
              Verify Email
            </button>
          </fieldset>
        </form>

        <div className="flex justify-center mt-5">
          <div className="flex gap-1 text-sm">
            Didn't receive the code?
            <button
              onClick={resendVerificationEmail}
              type="button"
              className="font-medium text-secondary-blue disabled:opacity-50"
              disabled={tryAgainDuration > 0}
            >
              Resend Code
            </button>
            {tryAgainDuration > 0 && (
              <div className="flex gap-1 px-1 rounded-full bg-slate-300 ">
                <div>Try again in</div>
                <div className="font-mono ">
                  {tryAgainDuration.toString().padStart(2, "0")}
                </div>
                <div>s</div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center mt-5">
          <p className="text-sm">
            Need to change your email?{" "}
            <button
              onClick={backToSignup}
              className="font-medium text-secondary-blue"
            >
              Go back to Sign Up
            </button>
          </p>
        </div>
      </div>
    </main>
  );
}

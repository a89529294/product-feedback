import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { useAuth } from "../contexts/auth";
import { toast } from "sonner";
import { useState } from "react";

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
  const { verifyEmail, user, signout } = useAuth();
  const [isVerifying, setIsVerifying] = useState(false);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    setIsVerifying(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    await new Promise((r) => setTimeout(r, 1000));
    const errorMessage = await verifyEmail(
      formData.get("verificationCode") as string
    );
    setIsVerifying(false);
    if (errorMessage) return toast.error(errorMessage);

    await router.invalidate();

    await navigate({ to: "/feedback" });
  };

  const backToSignup = async () => {
    await signout();

    navigate({ to: "/signup" });
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
              />
            </label>
          </fieldset>

          <fieldset className="mt-8">
            <button
              type="submit"
              className="w-full h-10 text-white rounded-md bg-primary disabled:opacity-50"
              disabled={isVerifying}
            >
              Verify Email
            </button>
          </fieldset>
        </form>

        <div className="flex justify-center mt-5">
          <p className="text-sm">
            Didn't receive the code?{" "}
            <button type="button" className="font-medium text-secondary-blue">
              Resend Code
            </button>
          </p>
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

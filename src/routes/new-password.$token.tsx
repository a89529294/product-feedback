import { apiURL } from "@/lib";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/new-password/$token")({
  component: () => <NewPassword />,
});

export default function NewPassword() {
  const router = useRouter();
  const navigate = Route.useNavigate();
  const { token } = Route.useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const newPasswordRef = useRef<HTMLInputElement>(null);

  // refactor this into /contexts/auth.tsx,
  // also set user and isAuthenticated
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedNewPassword = newPassword.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    if (trimmedNewPassword !== trimmedConfirmPassword) {
      toast.error("Passwords do not match");
      setNewPassword("");
      setConfirmPassword("");
      newPasswordRef.current?.focus();
      return;
    }

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

    if (!res.ok) toast.error(message);
    else {
      toast.success(message);

      await router.invalidate();

      await navigate({ to: "/feedback" });
    }
  };

  return (
    <main className="flex items-center h-screen">
      <div className="mx-auto w-80 md:w-96">
        <h1 className="mb-4 text-2xl font-bold text-center">
          Reset Your Password
        </h1>
        <h2 className="mb-8 text-xl font-bold text-center">
          <span className="text-lg text-slate-500">
            Enter your new password
          </span>
        </h2>

        <form onSubmit={onSubmit}>
          <fieldset className="space-y-8">
            <div className="space-y-2">
              <label className="flex flex-col gap-1">
                <span className="text-sm font-medium">New Password</span>
                <input
                  type="password"
                  className="w-full h-10 border border-transparent rounded-md focus:ring-0 focus:border-secondary-blue bg-pale-grey"
                  name="newPassword"
                  placeholder="Enter your new password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  ref={newPasswordRef}
                />
              </label>
            </div>
            <div className="space-y-2">
              <label className="flex flex-col gap-1">
                <span className="text-sm font-medium">Confirm Password</span>
                <input
                  type="password"
                  className="w-full h-10 border border-transparent rounded-md focus:ring-0 focus:border-secondary-blue bg-pale-grey"
                  name="confirmPassword"
                  placeholder="Confirm your new password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </label>
            </div>
          </fieldset>

          <button
            type="submit"
            className="w-full h-10 mt-8 text-white rounded-md bg-primary disabled:opacity-50"
            disabled={isSubmitting || newPassword !== confirmPassword}
          >
            Reset Password
          </button>
        </form>

        <div className="flex justify-center mt-5">
          <p className="text-sm">
            Remember your password?{" "}
            <a href="/signin" className="font-medium text-secondary-blue">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}

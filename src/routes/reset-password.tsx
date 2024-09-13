import { useAuth } from "@/contexts/auth";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/reset-password")({
  beforeLoad: ({
    context: {
      auth: { user },
    },
  }) => {
    if (user.type !== "email") {
      throw redirect({ to: "/feedback" });
    }
  },
  component: () => <ResetPassword />,
});

export function ResetPassword() {
  const { resetPassword, isSubmitting } = useAuth();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")!.toString().trim();

    const data = await resetPassword(email);

    if ("errorMessage" in data) toast.error(data.errorMessage);
    else toast.success(data.successMessage);
  }

  return (
    <main className="flex items-center h-screen">
      <div className="mx-auto w-80 md:w-96">
        <h1 className="mb-4 text-2xl font-bold text-center">
          Reset Your Password
        </h1>
        <h2 className="mb-8 text-xl font-bold text-center">
          <span className="text-lg text-slate-500">
            Enter your email address
          </span>
        </h2>

        <form onSubmit={onSubmit}>
          <fieldset className="space-y-8">
            <div className="space-y-2">
              <label className="flex flex-col gap-1">
                <span className="text-sm font-medium">Registered Email</span>
                <input
                  type="email"
                  className="w-full h-10 border border-transparent rounded-md focus:ring-0 focus:border-secondary-blue bg-pale-grey"
                  name="email"
                  placeholder="Enter your email"
                  required
                />
              </label>
            </div>
          </fieldset>

          <button
            type="submit"
            className="w-full h-10 mt-8 text-white rounded-md bg-primary disabled:opacity-50"
            disabled={isSubmitting}
          >
            Send
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

import {
  createFileRoute,
  Link,
  Navigate,
  redirect,
  useRouter,
} from "@tanstack/react-router";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useAuth } from "../contexts/auth";
import { z } from "zod";
import { fallbackPath } from "../lib";
import { toast } from "sonner";
import { useState } from "react";

export const Route = createFileRoute("/signup")({
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  beforeLoad: ({
    context: {
      auth: { isAuthenticated, isEmailVerified },
    },
    search,
  }) => {
    if (isAuthenticated && isEmailVerified) {
      throw redirect({ to: search.redirect || fallbackPath });
    } else if (isAuthenticated) {
      throw redirect({ to: "/verify-email" });
    }
  },
  component: () => <Signup />,
});

export function Signup() {
  const router = useRouter();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const { signup, isAuthenticated } = useAuth();
  const [isVerifying, setIsVerifying] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    setIsVerifying(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const errorMessage = await signup(formData);
    setIsVerifying(false);

    if (errorMessage) return toast.error(errorMessage);

    await router.invalidate();

    await navigate({ to: "/verify-email" });
  }
  return (
    <main className="flex items-center h-screen">
      {isAuthenticated && <Navigate to={search.redirect || fallbackPath} />}
      <div className="mx-auto w-80 md:w-96">
        <h1 className="mb-4 text-2xl font-bold text-center">
          Welcome to <span className="text-primary">Product Feedback</span>
        </h1>
        <h2 className="mb-8 text-2xl font-bold text-center">
          Create your account
        </h2>

        <form onSubmit={onSubmit}>
          <fieldset className="space-y-8">
            <label className="flex flex-col gap-1 ">
              <span className="text-sm font-medium">Email Address</span>
              <input
                type="email"
                className="w-full h-10 border border-transparent rounded-md focus:ring-0 focus:border-secondary-blue bg-pale-grey"
                name="email"
              />
            </label>

            <label className="flex flex-col gap-1 ">
              <span className="text-sm font-medium">Password</span>
              <input
                type="password"
                className="w-full h-10 border border-transparent rounded-md focus:ring-0 focus:border-secondary-blue bg-pale-grey"
                name="password"
                minLength={6}
              />
            </label>
          </fieldset>

          <fieldset>
            <button
              type="submit"
              className="w-full h-10 mt-5 text-white rounded-md bg-primary disabled:opacity-50"
              disabled={isVerifying}
            >
              Sign up
            </button>
          </fieldset>
        </form>

        <div>
          <div className="flex items-center gap-1 my-5">
            <div className="flex-1 h-px bg-slate-300" />
            <span className="text-sm capitalize text-black/75">
              or continue with
            </span>
            <div className="flex-1 h-px bg-slate-300" />
          </div>

          <div className="flex gap-4">
            <button className="flex items-center justify-center flex-1 h-10 gap-3 text-white rounded-md bg-secondary-blue">
              <FaGithub />
              Github
            </button>
            <button className="flex items-center justify-center flex-1 h-10 gap-3 text-white rounded-md bg-secondary-indigo">
              <FaGoogle />
              Google
            </button>
          </div>

          <div className="flex justify-center mt-5">
            <p>
              Already have an account?{" "}
              <Link
                from="/signup"
                to="/signin"
                className="font-medium text-secondary-blue"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

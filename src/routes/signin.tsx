import { cn } from "@/lib/utils";
import {
  createFileRoute,
  Link,
  Navigate,
  redirect,
  useRouter,
} from "@tanstack/react-router";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { toast } from "sonner";
import { z } from "zod";
import { useAuth } from "../contexts/auth";
import { fallbackPath } from "../lib";

export const Route = createFileRoute("/signin")({
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  beforeLoad: ({
    context: {
      auth: { isAuthenticated, isNeedingEmailVerification },
    },
    search,
  }) => {
    if (isAuthenticated && !isNeedingEmailVerification)
      throw redirect({ to: search.redirect || fallbackPath });
    if (isNeedingEmailVerification) throw redirect({ to: "/verify-email" });
  },
  component: () => <Signin />,
});

export function Signin() {
  const router = useRouter();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const { signin, isSubmitting, isAuthenticated, isNeedingEmailVerification } =
    useAuth();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")!.toString().trim();
    const password = formData.get("password")!.toString().trim();

    const errorMessage = await signin(email, password);

    if (errorMessage) return toast.error(errorMessage);

    await router.invalidate();

    await navigate({ to: search.redirect || fallbackPath });
  }

  return (
    <main className="flex items-center h-screen">
      {isAuthenticated && !isNeedingEmailVerification && (
        <Navigate to={search.redirect || fallbackPath} />
      )}
      {isNeedingEmailVerification && <Navigate to="/verify-email" />}
      <div className="mx-auto w-80 md:w-96">
        <h1 className="mb-4 text-2xl font-bold text-center">
          Welcome to <span className="text-primary">Product Feedback</span>
        </h1>
        <h2 className="mb-8 text-2xl font-bold text-center">
          Sign in to your account
        </h2>

        <form onSubmit={onSubmit}>
          <fieldset className="space-y-8">
            <label className="flex flex-col gap-1 ">
              <span className="text-sm font-medium">email</span>
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
            <div className="flex justify-between my-5 text-sm">
              <Link
                to="/reset-password"
                className="font-medium text-secondary-blue"
              >
                Forgot your password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full h-10 text-white rounded-md bg-primary disabled:opacity-50"
              disabled={isSubmitting}
            >
              Sign in
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
            <a
              href="http://localhost:3000/login/github"
              className="flex items-center justify-center flex-1 h-10 gap-3 text-white rounded-md bg-secondary-blue disabled:opacity-50"
              // disabled={isSubmitting}
              // onClick={onGithubSignin}
            >
              <FaGithub />
              Github
            </a>
            <a
              href=""
              className={cn(
                "flex items-center justify-center flex-1 h-10 gap-3 text-white rounded-md bg-secondary-indigo disabled:opacity-50",
                isSubmitting && "pointer-events-none opacity-50"
              )}
            >
              <FaGoogle />
              Google
            </a>
          </div>

          <div className="flex justify-center mt-5">
            <p>
              Don't have an account?{" "}
              <Link
                from="/signin"
                to="/signup"
                className="font-medium text-secondary-blue disabled:opacity-50"
                disabled={isSubmitting}
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

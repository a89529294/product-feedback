import {
  createFileRoute,
  Link,
  useRouter,
  redirect,
  Navigate,
} from "@tanstack/react-router";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useAuth } from "../contexts/auth";
import { z } from "zod";

const fallback = "/feedback";

export const Route = createFileRoute("/signin")({
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  beforeLoad: ({ context, search }) => {
    console.log(context, search);
    if (context.auth.isAuthenticated) {
      throw redirect({ to: search.redirect || fallback });
    }
  },
  component: () => <Signin />,
});

export function Signin() {
  const router = useRouter();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const { signin, isAuthenticated } = useAuth();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    await signin(formData);

    await router.invalidate();

    await navigate({ to: search.redirect || fallback });
  }
  return (
    <main className="flex items-center h-screen">
      {isAuthenticated && <Navigate to={search.redirect || fallback} />}
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
              <span className="text-sm font-medium">Email Address</span>
              <input
                type="text"
                className="w-full h-10 border border-transparent rounded-md focus:ring-0 focus:border-secondary-blue bg-pale-grey"
                name="username"
              />
            </label>

            <label className="flex flex-col gap-1 ">
              <span className="text-sm font-medium">Password</span>
              <input
                type="password"
                className="w-full h-10 border border-transparent rounded-md focus:ring-0 focus:border-secondary-blue bg-pale-grey"
                name="password"
              />
            </label>
          </fieldset>

          <fieldset>
            <div className="flex justify-between my-5 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" name="remember-me" />
                Remember me
              </label>
              <button type="button" className="font-medium text-secondary-blue">
                Forgot your password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full h-10 text-white rounded-md bg-primary"
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
              Don't have an account?{" "}
              <Link
                from="/signin"
                to="/signup"
                className="font-medium text-secondary-blue"
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

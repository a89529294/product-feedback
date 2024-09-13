import {
  Outlet,
  createFileRoute,
  redirect,
  useRouter,
} from "@tanstack/react-router";

import { useAuth } from "../contexts/auth";

export const Route = createFileRoute("/_auth")({
  beforeLoad: ({
    context: {
      auth: { isAuthenticated, isNeedingEmailVerification },
    },
    location,
  }) => {
    if (!isAuthenticated) {
      throw redirect({
        to: "/signin",
        search: {
          redirect: location.href,
        },
      });
    }

    if (isAuthenticated && isNeedingEmailVerification) {
      throw redirect({ to: "/verify-email" });
    }
  },
  component: AuthLayout,
});

function AuthLayout() {
  const router = useRouter();
  const navigate = Route.useNavigate();
  const auth = useAuth();

  const handleLogout = () => {
    auth.signout().then(() => {
      router.invalidate().finally(() => {
        navigate({ to: "/signin" });
      });
    });
  };

  return (
    <div className="h-full p-2">
      <h1>Authenticated Route</h1>
      <p>This route's content is only visible to authenticated users.</p>
      <ul className="flex gap-2 py-2">
        <li>
          <button
            type="button"
            className="hover:underline"
            onClick={handleLogout}
          >
            Logout
          </button>
        </li>
      </ul>
      <hr />
      <Outlet />
    </div>
  );
}

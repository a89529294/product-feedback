import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

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
  return (
    <div className="min-h-full">
      <Outlet />
    </div>
  );
}

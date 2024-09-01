import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

import type { AuthContext } from "../contexts/auth";
import { RouterDevtools } from "../components/router-devtools";

interface MyRouterContext {
  auth: AuthContext;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <Outlet />
      <RouterDevtools position="bottom-right" initialIsOpen={false} />
    </>
  ),
});

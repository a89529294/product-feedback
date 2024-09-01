import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import React, { ComponentProps, Suspense } from "react";

const OptionalTanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        }))
      );

export function RouterDevtools(
  props: ComponentProps<typeof TanStackRouterDevtools>
) {
  return (
    <Suspense>
      <OptionalTanStackRouterDevtools {...props} />
    </Suspense>
  );
}

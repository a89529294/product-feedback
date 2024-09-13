import { createFileRoute } from "@tanstack/react-router";

import { useAuth } from "../contexts/auth";

export const Route = createFileRoute("/_auth/feedback")({
  component: IndexPage,
});

function IndexPage() {
  const { user } = useAuth();
  const username =
    user.type === "oauth"
      ? user.username
      : user.type === "email"
        ? user.email
        : "";

  return (
    <section className="grid gap-2 p-2">
      <p>Hi {username}!</p>
      <p>You are currently on the dashboard route.</p>
    </section>
  );
}

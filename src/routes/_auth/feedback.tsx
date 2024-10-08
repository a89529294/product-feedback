import { createFileRoute } from "@tanstack/react-router";
// import { useAuth } from "../../contexts/auth";

export const Route = createFileRoute("/_auth/feedback")({
  component: () => <IndexPage />,
});

function IndexPage() {
  // const router = useRouter();
  // const navigate = Route.useNavigate();
  // const auth = useAuth();

  // const handleLogout = () => {
  //   auth.signout().then(() => {
  //     router.invalidate().finally(() => {
  //       navigate({ to: "/signin" });
  //     });
  //   });
  // };

  return (
    <div>
      <header className="flex justify-between px-6 py-4 bg-gradient-to-tr header-linear-gradient">
        <div className="">
          <h1 className="text-[15px] font-bold text-white">Frontend Mentor</h1>
          <h2 className="text-[13px] font-medium opacity-75 text-white">
            Feedback Board
          </h2>
        </div>
        <button>burger menu</button>
      </header>
    </div>
  );
}

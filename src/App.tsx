import { FaGithub, FaGoogle } from "react-icons/fa";
import { baseURL } from "./lib";

function App() {
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const res = await fetch(`${baseURL}/signup`, {
      method: "POST",
      body: JSON.stringify({
        username: formData.get("username"),
        password: formData.get("password"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);
  }
  return (
    <main className="flex items-center h-screen">
      <div className="w-80 md:w-96 mx-auto">
        <h1 className="text-2xl font-bold text-center mb-8">
          Create your account
        </h1>

        <form onSubmit={onSubmit}>
          <fieldset className="space-y-8">
            <label className="flex flex-col gap-1 ">
              <span className="text-sm font-medium">Email Address</span>
              <input
                type="text"
                className="h-10 w-full rounded-md border border-transparent focus:ring-0 focus:border-secondary-blue bg-pale-grey"
                name="username"
              />
            </label>

            <label className="flex flex-col gap-1 ">
              <span className="text-sm font-medium">Password</span>
              <input
                type="password"
                className="h-10 w-full rounded-md border border-transparent focus:ring-0 focus:border-secondary-blue bg-pale-grey"
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
              className="w-full h-10 bg-primary text-white rounded-md"
            >
              Sign up
            </button>
          </fieldset>
        </form>

        <div>
          <div className="my-5 flex gap-1 items-center">
            <div className="flex-1 h-px bg-slate-300" />
            <span className="text-sm text-black/75 capitalize">
              or continue with
            </span>
            <div className="flex-1 h-px bg-slate-300" />
          </div>

          <div className="flex gap-4">
            <button className="bg-secondary-blue text-white rounded-md flex-1 h-10 flex items-center gap-3 justify-center">
              <FaGithub />
              Github
            </button>
            <button className="bg-secondary-indigo text-white rounded-md flex-1 h-10 flex items-center gap-3 justify-center">
              <FaGoogle />
              Google
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;

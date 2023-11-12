import { useLoaderData } from "@/hooks/loader.ts";
import { ApiUserInstance } from "@/lib/Api.ts";
import { Suspense } from "react";
import { Await, Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { LoadingScreen } from "@/components/LoadingScreen.tsx";
import { ProfileContext } from "@/hooks/profile.ts";
import { UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { client } from "@/lib/client.ts";
import { toast } from "@/components/ui/use-toast.ts";

export function Header({ user }: { user: ApiUserInstance }) {
  const navigate = useNavigate();

  async function handleLogout() {
    await client.logout.logout();

    toast({
      description: "Logout success",
    });
    navigate("/login");
  }

  return (
    <header
      className={
        "w-full px-4 h-12 bg-slate-950 flex justify-between items-center text-white"
      }
    >
      <div>
        <Link to={"/"}>Home</Link>
      </div>
      <div>
        <div className={"flex items-center gap-x-6"}>
          <div>
            <Link to={"/profile"}>
              <div className={"flex"}>
                <UserIcon className={"pr-1"} />
                <p className={"font-semibold"}>{user.name}</p>
              </div>
            </Link>
          </div>
          <div>
            <Button
              variant={"destructive"}
              size={"sm"}
              onClick={() => {
                void handleLogout();
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export function Layout() {
  const { user: userPromise } = useLoaderData<{
    user: Promise<ApiUserInstance>;
  }>();

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Await resolve={userPromise} errorElement={<Navigate to={"/login"} />}>
        {(user) => (
          <ProfileContext.Provider value={user}>
            <main className={"absolute w-full min-h-screen bg-gray-100"}>
              <Header user={user} />
              <div className={"mx-auto max-w-screen-lg px-2 lg:px-0"}>
                <Outlet />
              </div>
            </main>
          </ProfileContext.Provider>
        )}
      </Await>
    </Suspense>
  );
}

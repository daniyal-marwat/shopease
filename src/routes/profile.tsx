import StoreLayout from "@/layouts/StoreLayout";
import Addresses from "@/components/profile/Addresses";
import { redirect, createFileRoute } from "@tanstack/react-router";
import supabase from "@/lib/supabase";
import { getProfileData, logOut } from "@/lib/api";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/profile")({
  component: Profile,
  loader: profileLoader,
  beforeLoad: async () => {
    const { data: user } = await supabase.auth.getSession();

    if (!user.session)
      return redirect({ to: "/login", search: { redirect: "/profile" } });
  },
  pendingComponent: () => (
    <div className="flex items-center justify-center h-screen">
      <p className="font-bold">Loading...</p>
    </div>
  ),
  pendingMs: 0,
});

async function profileLoader() {
  const profile = await getProfileData();
  return profile;
}

export default function Profile() {
  const profile = Route.useLoaderData();

  return (
    <StoreLayout>
      <div className="md:max-w-4xl px-4 max-w-lg my-4 mx-auto">
        {!profile && <p className="text-center font-bold">Profile not found</p>}
        {profile && (
          <>
            <h1 className="text-2xl font-semibold">Profile</h1>
            <div>
              <div className="mt-4 shadow rounded-2xl p-4 flex flex-col gap-2">
                <div>
                  <p className="text-xs font-semibold ">Name</p>
                  <p className="text-sm">{profile.full_name}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold ">Email</p>
                  <p className="text-sm">{profile.email}</p>
                </div>
              </div>
              <Addresses addresses={profile.addresses} />

              <Button
                onClick={() => {
                  logOut();
                }}
                className="m-4 cursor-pointer"
                variant={"destructive"}
              >
                Logout
              </Button>
            </div>
          </>
        )}
      </div>
    </StoreLayout>
  );
}

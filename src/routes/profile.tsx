import StoreLayout from "@/layouts/StoreLayout";
import Addresses from "@/components/profile/Addresses";
import { redirect, createFileRoute } from "@tanstack/react-router";
import supabase from "@/lib/supabase";
import { getProfileData } from "@/lib/api";

export const Route = createFileRoute("/profile")({
  component: Profile,
  loader: profileLoader,
  beforeLoad: async () => {
    const { data: user } = await supabase.auth.getSession();

    if (!user.session)
      return redirect({ to: "/login", search: { redirect: "/profile" } });
  },
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
        <h1 className="text-2xl font-semibold">Profile</h1>
        <div>
          <div className="mt-4 shadow rounded-2xl p-4 flex flex-col gap-2">
            <div>
              <p className="text-xs text-black/50 ">Name</p>
              <p className="text-sm">{profile.name}</p>
            </div>
            <div>
              <p className="text-xs text-black/50 ">Email</p>
              <p className="text-sm">{profile.email}</p>
            </div>
          </div>
          <Addresses addresses={profile.addresses} />
        </div>
      </div>
    </StoreLayout>
  );
}

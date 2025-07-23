import SignupForm from "@/components/auth/SignupForm";
import { useAsync } from "@/hooks/useAsync";
import type { AuthResponse } from "@supabase/supabase-js";
import supabase from "../lib/supabase";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
});

function SignupPage() {
  const { data, error, run, loading } = useAsync<AuthResponse>();

  function handleSignup(email: string, password: string) {
    run(supabase.auth.signUp({ email, password }));
  }

  return (
    <div className="flex items-center max-w-sm h-screen m-auto">
      <SignupForm
        loading={loading}
        onSubmit={handleSignup}
        error={error || data?.error}
      />
    </div>
  );
}

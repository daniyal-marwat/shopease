import { LoginForm } from "@/components/auth/LoginForm";
import { useAsync } from "@/hooks/useAsync";
import type { AuthTokenResponse } from "@supabase/supabase-js";
import supabase from "../lib/supabase";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const { loading, error, run, data } = useAsync<AuthTokenResponse>();

  function handleLogin(email: string, password: string) {
    run(supabase.auth.signInWithPassword({ email, password }));
  }

  return (
    <div className="flex items-center justify-center h-screen max-w-sm m-auto">
      <LoginForm
        onSubmit={handleLogin}
        error={data?.error || error}
        loading={loading}
      />
    </div>
  );
}

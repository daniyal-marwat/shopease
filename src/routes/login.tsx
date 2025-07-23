import { LoginForm } from "@/components/auth/LoginForm";
import { useAsync } from "@/hooks/useAsync";
import type { AuthTokenResponse } from "@supabase/supabase-js";
import supabase from "../lib/supabase";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  beforeLoad: async () => {
    const { data: user } = await supabase.auth.getSession();
    if (user.session) {
      return redirect({ to: "/" });
    }
  },
  validateSearch: (search: { redirect?: string }) => {
    const redirect =
      typeof search.redirect === "string" ? search.redirect : "/";
    return { redirect };
  },
});

function LoginPage() {
  const { redirect: redirectUrl } = Route.useSearch();
  const navigate = useNavigate();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        navigate({ to: redirectUrl });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

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

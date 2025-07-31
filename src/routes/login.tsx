import { LoginForm } from "@/components/auth/LoginForm";
import supabase from "../lib/supabase";
import {
  createFileRoute,
  redirect,
  useNavigate,
  type SearchSchemaInput,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { login } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  beforeLoad: async () => {
    const { data: user } = await supabase.auth.getSession();
    if (user.session) {
      return redirect({ to: "/" });
    }
  },
  validateSearch: (search: { redirect?: string } & SearchSchemaInput) => {
    const redirect =
      typeof search.redirect === "string" ? search.redirect : undefined;
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
        navigate({
          to: redirectUrl || "/",
          replace: true,
          reloadDocument: true,
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const mutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
  });

  function handleLogin(email: string, password: string) {
    mutation.mutate({ email, password });
  }

  return (
    <div className="flex items-center justify-center h-screen max-w-sm m-auto">
      <LoginForm
        onSubmit={handleLogin}
        error={mutation.error}
        loading={mutation.isPending}
      />
    </div>
  );
}

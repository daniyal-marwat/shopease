import ForgotForm from "@/components/auth/ForgotForm";
import { useAsync } from "@/hooks/useAsync";
import type { AuthError } from "@supabase/supabase-js";
import supabase from "../lib/supabase";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/forgot")({
  component: ForgotPage,
});

function ForgotPage() {
  const { run, data, loading, error, success } = useAsync<
    | {
        // eslint-disable-next-line @typescript-eslint/no-empty-object-type
        data: {};
        error: null;
      }
    | {
        data: null;
        error: AuthError;
      }
  >();

  function handleReset(email: string) {
    run(supabase.auth.resetPasswordForEmail(email));
  }
  return (
    <div className="flex items-center justify-center max-w-sm m-auto h-screen">
      <ForgotForm
        onSubmit={handleReset}
        loading={loading}
        error={data?.error || error}
        success={success}
      />
    </div>
  );
}

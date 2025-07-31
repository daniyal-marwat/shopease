import ForgotForm from "@/components/auth/ForgotForm";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { resetPasswordForEmail } from "@/lib/api";
import { toastMessage } from "@/lib/toastMessage";

export const Route = createFileRoute("/forgot")({
  component: ForgotPage,
});

function ForgotPage() {
  const updatePasswordMutation = useMutation({
    mutationFn: (email: string) => resetPasswordForEmail(email),
    onSuccess: () => {
      toastMessage("Password reset link sent successfully", "accomplishment");
    },
    onError: (error) => {
      toastMessage(error.message, "error");
    },
  });

  function handleReset(email: string) {
    updatePasswordMutation.mutate(email);
  }
  return (
    <div className="flex items-center justify-center max-w-sm m-auto h-screen">
      <ForgotForm
        onSubmit={handleReset}
        loading={updatePasswordMutation.isPending}
        success={updatePasswordMutation.isSuccess}
      />
    </div>
  );
}

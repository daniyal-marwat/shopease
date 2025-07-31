import UpdatePasswordForm from "@/components/auth/UpdatePasswordForm";
import { updateUserPassword } from "@/lib/api";
import { toastMessage } from "@/lib/toastMessage";
import { isAuthenticated } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/update-password")({
  component: RouteComponent,
  beforeLoad: async () => {
    const loggedIn = await isAuthenticated();
    if (!loggedIn) {
      return redirect({ to: "/login" });
    }
  },
});

function RouteComponent() {
  const navigate = useNavigate();

  const updatePasswordMutation = useMutation({
    mutationFn: (password: string) => updateUserPassword(password),
    onSuccess: () => {
      toastMessage("Password updated successfully", "accomplishment");
      navigate({ to: "/" });
    },
    onError: (error) => {
      toastMessage(error.message, "error");
    },
  });

  return (
    <div className="flex items-center justify-center h-screen">
      <UpdatePasswordForm updatePassword={updatePasswordMutation.mutate} />
    </div>
  );
}

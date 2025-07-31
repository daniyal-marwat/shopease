import SignupForm from "@/components/auth/SignupForm";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { signUp } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();

  const signupMutation = useMutation({
    mutationFn: ({
      email,
      password,
      fullname,
    }: {
      email: string;
      password: string;
      fullname: string;
    }) => signUp(email, password, fullname),
    onSuccess: () => {
      navigate({
        to: "/",
        replace: true,
        reloadDocument: true,
      });
    },
  });

  function handleSignup(email: string, password: string, fullname: string) {
    signupMutation.mutate({ email, password, fullname });
  }

  return (
    <div className="flex items-center max-w-sm h-screen m-auto">
      <SignupForm
        loading={signupMutation.isPending}
        onSubmit={handleSignup}
        error={signupMutation.error}
      />
    </div>
  );
}

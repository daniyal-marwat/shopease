import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { LabelInput } from "../ui/labelInput";
import { useEffect, useState } from "react";
import { toastMessage } from "@/lib/toastMessage";
import { Link } from "@tanstack/react-router";

interface Props {
  onSubmit: (email: string) => void;
  error: Error | null;
  loading: boolean;
  success: boolean;
}

export default function ForgotForm({
  onSubmit,
  error,
  loading,
  success,
}: Props) {
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (success)
      toastMessage("The password reset link has been sent.", "accomplishment");
    if (error) toastMessage(error.message, "error");
  }, [success, error]);

  return (
    <Card className="w-full shadow-2xl">
      <CardHeader className="text-center text-2xl">
        <h1>Forgot password</h1>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(email);
          }}
        >
          <LabelInput
            name="Email"
            type="email"
            placeholder="Enter your email"
            required
            onValueChange={(value) => setEmail(value)}
          />
          <Button disabled={loading} className="w-full cursor-pointer mt-6">
            Reset password
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="h-[1px] bg-gray-400/40 rounded my-2 w-full"></div>
        <div className="flex items-center justify-center m-auto gap-2 ">
          <span>&#8617;</span>
          <Button className="p-0" variant={"link"}>
            <Link to={"/login"}>
              <p className="text-sm">Back to login</p>
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

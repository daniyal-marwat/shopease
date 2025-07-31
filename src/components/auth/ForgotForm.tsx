import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { LabelInput } from "../ui/labelInput";
import { useState } from "react";
import { Link } from "@tanstack/react-router";

interface Props {
  onSubmit: (email: string) => void;
  loading: boolean;
  success: boolean;
}

export default function ForgotForm({ onSubmit, loading, success }: Props) {
  const [email, setEmail] = useState("");

  return (
    <Card className="w-full shadow-2xl">
      <CardHeader className="text-center text-2xl">
        <h1>Forgot password</h1>
      </CardHeader>
      <CardContent>
        {success ? (
          <p className="text-center text-green-500">
            The password reset link has been sent.
          </p>
        ) : (
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
        )}
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

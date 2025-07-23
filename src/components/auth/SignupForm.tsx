import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { ErrorMessage } from "../ui/errorMessage";
import { Label } from "../ui/label";
import { LabelInput } from "../ui/labelInput";
import { Link } from "@tanstack/react-router";
import { toastMessage } from "@/lib/toastMessage";

interface Props {
  onSubmit: (email: string, password: string) => void;
  error: Error | undefined | null;
  loading: boolean;
}

export default function SignupForm({ onSubmit, error, loading }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [inputError, setInputError] = useState("");

  useEffect(() => {
    setInputError("");

    const timeout = setTimeout(() => {
      if (password !== confirmPassword) setInputError("Password Mismatch");
    }, 200);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmPassword]);

  useEffect(() => {
    if (error) toastMessage(error.message, "error");
  }, [error]);

  return (
    <Card data-testid="signup-form" className="w-full shadow-2xl">
      <CardHeader>
        <h1 className="text-center text-2xl">Create Your Account</h1>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            // const form = new FormData(e.target as HTMLFormElement);
            // const fullName = form.get("fullname");

            onSubmit(email, password);
          }}
        >
          <LabelInput
            name="Full Name"
            placeholder="Enter your full name"
            required
            data-testid="full-name-input"
          />
          <LabelInput
            type="email"
            name="Email Address"
            placeholder="Enter your email"
            required
            data-testid="email-input"
            onValueChange={(value) => {
              setEmail(value);
            }}
          />
          <LabelInput
            type="password"
            name="Password"
            placeholder="Enter your password"
            required
            data-testid="password-input"
            onValueChange={(value) => {
              setPassword(value);
            }}
          />
          <LabelInput
            type="password"
            name="Confirm Password"
            placeholder="Confirm your password"
            required
            data-testid="confirm-password-input"
            onValueChange={(value) => {
              setConfirmPassword(value);
            }}
          />
          <div className="flex gap-2">
            <Checkbox id="termsService" required data-testid="terms-service" />
            <Label htmlFor="termsService">
              I agree to the Terms of Service
            </Label>
          </div>
          {inputError && <ErrorMessage errorMessage={inputError} />}
          <Button
            data-testid="signup-button"
            disabled={loading || !!inputError}
            className="cursor-pointer"
          >
            Sign Up
          </Button>
          <div className="h-[1px]  bg-gray-400/40 rounded"></div>
        </form>
      </CardContent>
      <CardFooter className="justify-center">
        <div className="text-sm">
          Already have an account?
          <Button variant={"link"} className="text-sm">
            <Link to={"/login"}>Login here</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

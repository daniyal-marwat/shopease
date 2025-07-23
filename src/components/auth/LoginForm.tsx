import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { LabelInput } from "../ui/labelInput";
import { useEffect } from "react";
import { toastMessage } from "@/lib/toastMessage";

interface Props {
  onSubmit: (email: string, password: string) => void;
  loading: boolean;
  error: Error | null;
}

function LoginForm({ onSubmit, error, loading }: Props) {
  useEffect(() => {
    if (error) toastMessage(error.message, "error");
  }, [error]);

  return (
    <Card data-testid="login-form" className="shadow-2xl w-full">
      <CardHeader className="text-center text-2xl">
        Welcome to ShopEase
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-8"
          onSubmit={(e) => {
            e.preventDefault();
            const form = new FormData(e.target as HTMLFormElement);
            const email = form.get("email");
            const password = form.get("password");
            // const remember = form.get("remember");
            if (typeof email === "string" && typeof password === "string") {
              onSubmit(email, password);
            }
          }}
        >
          <LabelInput
            name="Email"
            placeholder="Enter your email"
            type="email"
            required
            data-testid="email-input"
          />
          <LabelInput
            type="password"
            name="Password"
            placeholder="Enter your password"
            required
            data-testid="password-input"
          />
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Checkbox id="remember" name="remember" />
              <Label htmlFor="remember">Remember Me</Label>
            </div>
            <Button type="button" variant={"link"} className="w-fit text-sm">
              <Link to={"/forgot"}>Forgot Password?</Link>
            </Button>
          </div>

          <Button
            disabled={loading}
            type="submit"
            className="w-full cursor-pointer"
          >
            Login
          </Button>
          <div className="h-[1px] bg-gray-400/40 rounded"></div>
        </form>
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <p className="text-sm">Don't have an account?</p>
        <Button variant={"link"}>
          <Link to={"/signup"}>SignUp</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
export { LoginForm };

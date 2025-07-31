import { Card, CardContent, CardHeader } from "../ui/card";
import { LabelInput } from "../ui/labelInput";
import { Button } from "../ui/button";
import { useState } from "react";

interface UpdatePasswordFormProps {
  updatePassword: (password: string) => void;
}

export default function UpdatePasswordForm({
  updatePassword,
}: UpdatePasswordFormProps) {
  const [password, setPassword] = useState("");

  return (
    <Card className="max-w-xs w-full">
      <CardHeader className="text-center font-semibold">
        Update password
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (password.trim() !== "") updatePassword(password);
          }}
        >
          <LabelInput
            required
            value={password}
            onValueChange={(value) => setPassword(value)}
            name="Password"
            type="password"
            placeholder="Enter your new password"
          />
          <Button
            className="mt-8 w-full cursor-pointer"
            type="submit"
            disabled={password.trim() === ""}
          >
            Update password
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

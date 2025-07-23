import type { InputHTMLAttributes } from "react";
import { Input } from "./input";
import { Label } from "./label";

interface LabelInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  onValueChange?: (value: string) => void;
}

function LabelInput({
  name,
  placeholder,
  type = "text",
  onValueChange,
  ...props
}: LabelInputProps) {
  const id = name
    .toLowerCase()
    .split("")
    .filter((letter) => letter !== " ")
    .join("");
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{name}</Label>
      <Input
        onChange={(e) => {
          if (onValueChange) onValueChange(e.target.value);
        }}
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}

export { LabelInput };

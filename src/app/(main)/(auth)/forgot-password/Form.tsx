"use client";

import AppInput, { AppInputProps } from "@/components/ui/AppInput";
import { FormButton } from "@/components";
import { useState } from "react";
import { z } from "zod";

export default function ForgotPasswordForm() {
  const [isValidEmail, setEmailValid] = useState(true);

  return (
    <form className="flex flex-col gap-3 py-3">
      {<AppInput key={fields[0].name} {...fields[0]} />}
      {isValidEmail && <AppInput key={fields[1].name} {...fields[1]} />}
      <FormButton className="btn-primary">
        {isValidEmail ? "Reset Password" : "Verify Email"}
      </FormButton>
    </form>
  );
}

const fields: AppInputProps[] = [
  {
    name: "email",
    title: "Email",
    type: "email",
    placeholder: "Email Address",
    schema: z.string()
  },
  {
    name: "code",
    title: "Reset Code",
    type: "number",
    placeholder: "Enter Reset Code",
    schema: z.string()
  }
];

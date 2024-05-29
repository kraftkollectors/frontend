"use client";

import AppInput, { AppInputProps } from "@/components/ui/AppInput";
import { FormButton, FormMessage } from "@/components";
import { useEffect, useState } from "react";
import { z } from "zod";
import { forgotPasswordSendEmail } from "@/actions";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { paths } from "@/utils";

export default function ForgotPasswordForm() {
  const [isValidEmail, setEmailValid] = useState(false);
  const [isValidToken, setTokenValid] = useState(false);
  const [res, action] = useFormState(forgotPasswordSendEmail, {});
  const {replace} = useRouter()

  useEffect(() => {
    if (res.success && res.data == 'valid_email') setEmailValid(true)
    if (res.success && res.data == 'valid_token') {
      setTokenValid(true)
      setEmailValid(false);
    }
    if (res.success && res.data == 'password_changed') {
      setTimeout(()=>replace(paths.login) ,1500)
    }
  }, [res])

  return (
    <form action={action} className="flex flex-col gap-3 py-3">
      <FormMessage res={res} />
      <AppInput key={fields[0].name} {...fields[0]} hidden={isValidToken} readonly={isValidEmail || isValidToken} />
      {isValidEmail && <AppInput key={fields[1].name} {...fields[1]}  />}
      {isValidToken && fields.slice(2).map(field =>
        <AppInput key={field.name} {...field} error={res.fieldErrors && res.fieldErrors[field.name]} />
      )}
      <FormButton className="btn-primary">
        {isValidToken ? "Reset Password" : "Continue"}
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
    name: "token",
    title: "Reset Code",
    type: "number",
    placeholder: "Enter Reset Code",
    schema: z.string()
  },
  {
    name: "password",
    title: "New Password",
    type: "password",
    placeholder: "Enter New Password",
    schema: z.string()
  },
  {
    name: "c_password",
    title: "Confirm New Password",
    type: "password",
    placeholder: "Enter New Password",
    schema: z.string()
  },
];

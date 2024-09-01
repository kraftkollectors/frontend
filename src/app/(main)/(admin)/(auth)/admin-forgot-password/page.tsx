'use client'

import { adminForgotPassword } from "@/actions/admin";
import { FormMessage, FormButton } from "@/components";
import AppInput, { AppInputProps } from "@/components/ui/AppInput";
import { paths } from "@/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useFormState } from "react-dom";

export default function Page() {
  const [isValidEmail, setEmailValid] = useState(false);
  const [isValidToken, setTokenValid] = useState(false);
  const [res, action] = useFormState(adminForgotPassword, {});
  const { replace } = useRouter()

  useEffect(() => {
    if (res.success && res.data == 'valid_email') setEmailValid(true)
    if (res.success && res.data == 'valid_token') {
      setTokenValid(true)
      setEmailValid(false);
    }
    if (res.success && res.data == 'password_changed') {
      setTimeout(() => replace(paths.login), 1500)
    }
  }, [res])

  return (
    <div className=" py-8">
      <h2 className=" text-headline font-bold">Admin, Forgot password</h2>
      <form
        action={action}
        className="flex flex-col gap-3 py-3"
      >
        <FormMessage res={res} />
        <AppInput key={fields[0].name} {...fields[0]} hidden={isValidToken} readonly={isValidEmail || isValidToken} />
        {isValidEmail && <AppInput key={fields[1].name} {...fields[1]} />}
        {isValidToken && fields.slice(2).map(field =>
          <AppInput key={field.name} {...field} error={res.fieldErrors && res.fieldErrors[field.name]} />
        )}
        <FormButton className="btn-primary">{isValidToken ? "Reset Password" : "Continue"}</FormButton>
        <Link
          href={paths.adminLogin}
          className="text-primary font-semibold"
        >
          back to login
        </Link>
      </form>
    </div>
  );
}

const fields: AppInputProps[] = [
  {
    name: "email",
    title: "Email",
    type: "email",
    placeholder: "Email Address",
  },
  {
    name: "token",
    title: "Reset Code",
    type: "number",
    placeholder: "Enter Reset Code",
  },
  {
    name: "password",
    title: "New Password",
    type: "password",
    placeholder: "Enter New Password",
  },
  {
    name: "c_password",
    title: "Confirm New Password",
    type: "password",
    placeholder: "Enter New Password",
  },
];

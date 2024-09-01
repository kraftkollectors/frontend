"use client";

import AppInput, { AppInputProps } from "@/components/ui/AppInput";
import { FormButton, FormMessage } from "@/components";
import Link from "next/link";
import { login, resendVerificationCode } from "@/actions";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AppToast from "@/components/Toast";
import { useRouter } from "next/navigation";
import { paths } from "@/utils";

export default function LoginForm() {
  const { push } = useRouter();
  const [res, action] = useFormState(login, {});
  const [verify, setVerify] = useState(false);
  useEffect(() => {
    if (res.error !== "verify email first") return;

    async function sendCode() {
      const sent = await resendVerificationCode(res.data);
      if (sent) setVerify(true);
    }

    sendCode();
  }, [res]);

  return (
    <form action={action} className="flex flex-col gap-3 py-3">
      <FormMessage res={res} />
      {loginFields.map((item) => {
        return (
          <AppInput
            key={item.name}
            {...item}
            hidden={verify}
            type={verify ? "hidden" : item.type}
          />
        );
      })}
      {verify && (
        <p className="font-semibold text-black-400">
          Enter the verification code / token sent to your email
        </p>
      )}
      {verify && (
        <AppInput
          name="token"
          type="number"
          title="Token"
          placeholder="Enter verification code"
          inputProps={{ required: true }}
        />
      )}
      <div className="flex justify-end">
        <Link
          href="/forgot-password"
          className="text-label font-semibold text-black-500 underline"
        >
          Forgot Password?
        </Link>
      </div>
      <FormButton className="btn-primary">Login</FormButton>
    </form>
  );
}

const loginFields: AppInputProps[] = [
  {
    name: "email",
    title: "Email",
    type: "email",
    placeholder: "Email Address",
    inputProps: { required: true },
  },
  {
    name: "password",
    title: "Password",
    type: "password",
    placeholder: "Enter your Password",
    inputProps: { required: true },
  },
];

import React from "react";
import ForgotPasswordForm from "./Form";
import { staticMetadata } from "@/functions/metadata";
import { Metadata } from "next";

export const metadata:Metadata = staticMetadata({
  title: "KraftKollectors | Forgot Password",
  description: "Forgot your password? no worries! Recover your KraftKollectors password"
})

export default function Page() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-headline r-font-bold">Forgot Password</h1>
      <p className="r-text-sm opacity-70">Recover and Reset your Password</p>
      <ForgotPasswordForm />
    </div>
  );
}

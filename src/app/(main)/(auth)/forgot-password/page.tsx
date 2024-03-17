import React from "react";
import ForgotPasswordForm from "./Form";

export default function Page() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="r-text-xl r-font-bold">Forgot Password</h1>
      <p className="r-text-sm opacity-70">Recover and Reset your Password</p>
      <ForgotPasswordForm />
    </div>
  );
}

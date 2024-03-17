import React from "react";
import ResetPasswordForm from "./Form";

export default function Page() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="r-text-xl r-font-bold">Reset Password</h1>
      <p className="r-text-sm opacity-70">Change your password</p>
      <ResetPasswordForm />
    </div>
  );
}

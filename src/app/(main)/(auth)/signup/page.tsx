import React from "react";
import LoginForm from "./Form";
import Link from "next/link";
import {
  ContinueWithGoogleButton,
  ContinueWithFacebookButton
} from "@/components";

export default function Page() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-headline r-font-bold">Create an Account</h1>
      <p className="r-text-sm opacity-70">
        Sign up now to begin your journey with us!
      </p>
      <LoginForm />
      <div className="flex justify-center items-center text-sm gap-1">
        <span className="opacity-60">Already have an account?</span>
        <Link href="/login" className="text-primary">
          Log In
        </Link>
      </div>
      <div className="relative flex justify-center opacity-70">
        <div className="absolute bg-dark-text h-[1px] w-full top-1/2 -translate-y-1/2" />
        <p className="relative bg-light w-fit px-2 py-1">OR</p>
      </div>
      <ContinueWithGoogleButton />
      <ContinueWithFacebookButton />
    </div>
  );
}

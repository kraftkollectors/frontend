import React from "react";
import LoginForm from "./Form";
import Link from "next/link";
import {
  ContinueWithGoogleButton,
  ContinueWithFacebookButton,
} from "@/components";
import { paths } from "@/utils";

export default function Page() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-title font-semibold">Create an Account</h1>
      {/* <p className="r-text-sm  text-black-200">
        Sign up now to begin your journey with us!
      </p> */}
      <LoginForm />
      <div className="flex justify-center items-center text-sm gap-1">
        <span className="text-black-200">Already have an account?</span>
        <Link href={paths.login} className="text-black-500 underline">
          Log In
        </Link>
      </div>
      <div className="relative flex justify-center">
        <div className="absolute bg-dark-50 h-[0.5px] w-full top-1/2 -translate-y-1/2" />
        <p className="relative bg-light w-fit px-2 py-1">Or</p>
      </div>
      <ContinueWithGoogleButton />
      <ContinueWithFacebookButton />
    </div>
  );
}

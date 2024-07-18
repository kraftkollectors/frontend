import React from "react";
import LoginForm from "./Form";
import Link from "next/link";
import {
  ContinueWithGoogleButton,
  ContinueWithFacebookButton
} from "@/components";
import { staticMetadata } from "@/functions/metadata";
import { Metadata } from "next";
import { paths } from "@/utils";

export const metadata:Metadata = staticMetadata({
  title: "KraftKollectors | Login",
  description: "Login to view your dashboard"
})

export default function Page() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-title font-semibold">Login to your account</h1>
      {/* <p className="r-text-sm opacity-70">Login to access you account</p> */}
      <LoginForm />
      <div className="flex justify-center items-center text-sm gap-1">
        <span className="text-black-200">dont have an account?</span>
        <Link href={paths.signup} className="text-black-500 underline">
          Sign Up
        </Link>
      </div>
      <div className="relative flex justify-center opacity-70">
        <div className="absolute bg-black-50 h-[0.5px] w-full top-1/2 -translate-y-1/2" />
        <p className="relative bg-light w-fit px-2 py-1">Or</p>
      </div>
      <ContinueWithGoogleButton />
      <ContinueWithFacebookButton />
    </div>
  );
}

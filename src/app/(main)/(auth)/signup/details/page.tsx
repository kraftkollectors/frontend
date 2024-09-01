import { cookies } from "next/headers";
import LoginForm from "./Form";
import { appCookies, paths } from "@/utils";
import { RedirectType, redirect } from "next/navigation";

export default async function Page() {
  if(!cookies().has(appCookies.registerData)) redirect(paths.signup, RedirectType.replace)
    
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-headline r-font-bold">Fill in your details</h1>
      <p className="r-text-sm text-black-200">
      Fill in your details to complete registration
      </p>
      <LoginForm />
      <div className="flex justify-center items-center text-sm gap-1">
       
      </div>
    </div>
  );
}

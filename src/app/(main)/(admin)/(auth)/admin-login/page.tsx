import { FormMessage, FormButton } from "@/components";
import AppInput, { AppInputProps } from "@/components/ui/AppInput";
import { paths } from "@/utils";
import { verify } from "crypto";
import Link from "next/link";

export default function Page() {
  return (
    <div className=" py-8">
      <h2 className=" text-headline font-bold">Login Admin</h2>
      <form
        //  action={action}
        className="flex flex-col gap-3 py-3"
      >
        <FormMessage res={{}} />
        {loginFields.map((item) => {
          return <AppInput key={item.name} {...item} />;
        })}
        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-primary r-font-semibold text-sm"
          >
            Forgot Password?
          </Link>
        </div>
        <FormButton className="btn-primary">Login</FormButton>
        <div className=" flex gap-2">
          <p>Don&apos;t have an account?</p>
          <Link
            href={paths.adminRegister}
            className="text-primary font-semibold"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}

const loginFields: AppInputProps[] = [
  {
    name: "email",
    title: "Email",
    type: "email",
    placeholder: "Email Address",
  },
  {
    name: "password",
    title: "Password",
    type: "password",
    placeholder: "Enter your Password",
  },
];

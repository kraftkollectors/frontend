import { FormButton, FormMessage } from "@/components";
import AppInput from "@/components/ui/AppInput";
import { paths } from "@/utils";
import Link from "next/link";

export default function Page() {
    return (
        <div className="[&_label]:font-semibold [&_label]:text-black-300  py-2">
             <h2 className=" text-headline font-bold">Register Admin</h2>
           <form action="" className="flex flex-col gap-4 py-2">
           <FormMessage res={{}} />
           <AppInput type="email" name="email" placeholder="Email Address " title="Email " />
           <div className="grid md:grid-cols-2 gap-3">
            <AppInput placeholder="Password" type="password" name="password" title="Password" />
            <AppInput type="password" placeholder="Confirm password" name="Confirmpassword" title="Confirm Password" />
           </div>
           <AppInput type="number" name="accesscode" placeholder="Access code " title="Access Code " />
           <FormButton className="btn-primary font-semibold">Register</FormButton>
           <div className=" flex gap-2">
          <p> Have an account?</p>
          <Link
            href={paths.adminLogin}
            className="text-primary font-semibold"
          >
            Sign In
          </Link>
        </div>
           </form>
             
        </div>
    );
}
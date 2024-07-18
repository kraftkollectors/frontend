'use client'

import { googleAuth, googleAuthRegister } from "@/actions";
import { debugLog } from "@/functions/helpers";
import { Dialog } from "@radix-ui/themes";
import { useGoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AppInput, { AppInputProps } from "./ui/AppInput";
import AppSelect from "./ui/AppSelect";
import { FormButton } from "./ui/FormButton";
import { FormMessage } from "./ui/FormMessage";
import { useFormState } from "react-dom";
import AppToast from "./Toast";
import { FaX } from "react-icons/fa6";

export type SocialButtonProps = {
  onError?: (msg?: string) => void;
}

export type GoogleAuthResponse = {
  email: string;
  given_name: string;
  family_name: string;
  picture?:string;
}

export function ContinueWithGoogleButton({ onError }: SocialButtonProps) {

  const [hasError, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [needsRegister, setNeedsRegister] = useState(false);
  const [googRes, setGoogRes] = useState<GoogleAuthResponse | null>(null);

  const login = useGoogleLogin({
    onError: handleError,
    onSuccess: handleSuccess
  })

  async function handleSuccess(res: { access_token: string }) {
    const data = await googleAuth(res);
    setLoading(false);
    // debugLog(data);
    if (data && data.error && data.error) {
      if (data.error == 'needs_register') {
        setNeedsRegister(true);
        setGoogRes(data.data);
        return;
      }
      toast(<AppToast.error message={data.error} />);
      if (onError) onError();
    };
  }

  function handleError() {
    toast(<AppToast.error message={"Google Auth Failed"} />);
    setLoading(false);
    if (onError) onError();
  }

  return (
    <>
      <GoogleAuthForm onOpenChange={setNeedsRegister} open={needsRegister} googRes={googRes} />
      {hasError ?
        <p className="flex p-2 justify-between items-center bg-red-100 border-red-800 text-red-800">
          <span>{hasError}</span>
          <button
            onClick={() => setError("")}
            className="underline p-1 rounded-md hover:bg-slate-100">try again</button>
        </p>
        :
        <button disabled={loading} onClick={() => {
          setLoading(true);
          login()
        }} className={`btn-dark-border text-black-300 !shadow-none gap-2 !py-2.5 ${loading ? 'animate-pulse pointer-events-none' : ''}`}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.255H17.92C17.665 15.63 16.89 16.795 15.725 17.575V20.335H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z"
              fill="#4285F4"
            />
            <path
              d="M11.9999 23C14.9699 23 17.4599 22.015 19.2799 20.335L15.7249 17.575C14.7399 18.235 13.4799 18.625 11.9999 18.625C9.13492 18.625 6.70992 16.69 5.84492 14.09H2.16992V16.94C3.97992 20.535 7.69992 23 11.9999 23Z"
              fill="#34A853"
            />
            <path
              d="M5.845 14.09C5.625 13.43 5.5 12.725 5.5 12C5.5 11.275 5.625 10.57 5.845 9.91V7.06H2.17C1.4 8.59286 0.999321 10.2846 1 12C1 13.775 1.425 15.455 2.17 16.94L5.845 14.09Z"
              fill="#FBBC05"
            />
            <path
              d="M11.9999 5.375C13.6149 5.375 15.0649 5.93 16.2049 7.02L19.3599 3.865C17.4549 2.09 14.9649 1 11.9999 1C7.69992 1 3.97992 3.465 2.16992 7.06L5.84492 9.91C6.70992 7.31 9.13492 5.375 11.9999 5.375Z"
              fill="#EA4335"
            />
          </svg>
          <span className="text-black-300">Continue with Google</span>
        </button>}
    </>
  );
}


export default function GoogleAuthForm({ open, googRes, onOpenChange }: { open: boolean; onOpenChange: (s:boolean)=>void; googRes: GoogleAuthResponse | null }) {
  const formFields: AppInputProps[] = [
    {
      name: "userName",
      title: "User Name",
      type: "text",
      placeholder: "User Name",
    },
    {
      name: "firstName",
      title: "First Name",
      type: "text",
      placeholder: "First Name",
      value: googRes ? googRes.given_name : ''
      },
      {
        name: "lastName",
        title: "Last Name",
        type: "text",
        placeholder: "Last Name",
        value: googRes ? googRes.family_name : ''
    },
  ];
  const [res, action] = useFormState(googleAuthRegister, {});
  const [isOpen, setIsOpen] = useState(open);

  useEffect(()=>{
    setIsOpen(open)}, [open])

  return (
    <div>
      <Dialog.Root open={isOpen} onOpenChange={(_)=>{
        onOpenChange(_);
        setIsOpen(_);
      }}>
        {/* <Dialog.Trigger></Dialog.Trigger> */}
        <Dialog.Content>
          <form action={action} className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
            <h2 className="font-bold text-title">Finish creating profile</h2>
            <Dialog.Close>
              <button className="icon-btn p-2">
                <FaX />
              </button>
            </Dialog.Close>
            </div>
            <FormMessage res={res} />

            {formFields.map(item => {
              return <AppInput key={item.name} {...item} error={res.fieldErrors ? res.fieldErrors[item.name] : undefined} />;
            })}
            <AppSelect title="Gender" name="gender" value="male" options={['male', 'female']} />
            <FormButton className="btn-primary">Sign Up</FormButton>
            {
              googRes && <>
                <input type='hidden' name="email" value={googRes.email} />
                <input type='hidden' name="image" value={googRes?.picture} />
              </>
            }
          </form>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}



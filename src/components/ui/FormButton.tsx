/* eslint-disable @next/next/no-img-element */
'use client'
import { HTMLAttributes } from "react";
import { useFormStatus } from "react-dom";
import { FaSpinner } from "react-icons/fa6";

export type FormButtonProps = HTMLAttributes<HTMLButtonElement> & {
  disabled?:boolean;
  loading?:boolean;
}

export function FormButton({
  className, children, loading = false, ...props
}:FormButtonProps) {
  const {pending} = useFormStatus();

return <button {...props} disabled={loading||pending} className={className} style={{
  opacity: loading||pending ? 0.5 : 1
}}>
  {
    loading||pending ? <img height={20} width={20} alt="..." src="/images/loading.gif" className="aspect-square object-cover" /> : <>{children}</>
  }
</button>;
}
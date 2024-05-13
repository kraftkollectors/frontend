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

return <button {...props} disabled={loading||pending} className={className}>
  {
    loading||pending ? <FaSpinner className="animate-spin" /> : <>{children}</>
  }
</button>;
}
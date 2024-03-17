import { FaSpinner } from "react-icons/fa6";

export type FormButtonProps = {
  className:string;
  children:React.ReactNode;
  loading?:boolean;
}

export function FormButton({
  className, children, loading = false
}:FormButtonProps) {
return <button className={className}>
  {
    loading ? <FaSpinner className="animate-spin" /> : <>{children}</>
  }
</button>;
}
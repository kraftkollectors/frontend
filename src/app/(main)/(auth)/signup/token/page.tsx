import LoginForm from "./Form";

export default function Page() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-headline r-font-bold">Verify Email</h1>
      <p className="r-text-sm text-black-200">
      Verify your email
      </p>
      <LoginForm />
      <div className="flex justify-center items-center text-sm gap-1">
       
      </div>
    </div>
  );
}

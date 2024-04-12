import ServicesForm from "./Form";
export default function page() {
  return (
    <main className="flex items-center bg-light-text  py-10 app-container">
      <div className="flex flex-col gap-2 max-w-[900px]  p-5 ">
        <h1 className="text-title r-font-bold">Create New Service</h1>
        <p className="r-text-sm opacity-70">Fill in details of your service</p>
        <ServicesForm />
      </div>
    </main>
  );
}

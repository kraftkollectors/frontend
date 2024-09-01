import ServicesForm from "./Form";
import { staticMetadata } from "@/functions/metadata";
import { Metadata } from "next";

export const metadata:Metadata = staticMetadata({
  title: "KraftKollectors | Create new service",
  description: "create a new service, provide details to start meeting clients"
})

export default function page() {
  return (
    <main className="flex items-center bg-light-text  py-10 app-container">
      <div className="flex flex-col gap-2 max-w-[900px]  md:p-5 ">
        <h1 className="text-title r-font-bold">Create New Service</h1>
        <p className="r-text-sm opacity-70">Fill in details of your service</p>
        <ServicesForm />
      </div>
    </main>
  );
}

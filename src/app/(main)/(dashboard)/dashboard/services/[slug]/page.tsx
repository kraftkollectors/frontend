import { AppPageProps } from "@/utils/types/basicTypes";
import ServicesForm from "./Form";
import { fetchSingleArtisanService } from "@/actions";
import { notFound } from "next/navigation";
import { debugLog } from "@/functions/helpers";
export default async function page({params}:AppPageProps<{slug:string}>) {
    const service = await fetchSingleArtisanService(params?.slug ?? '');
    if(!service) notFound()
    if(service == 'error') throw new Error("Something went wrong");
    
  return (
    <main className="flex items-center bg-light-text  py-10 app-container">
      <div className="flex flex-col gap-2 max-w-[900px]  md:p-5 ">
        <h1 className="text-title r-font-bold">Edit Service</h1>
        <p className="r-text-sm opacity-70">&quot;Fill in details of your service&quot;</p>
        <ServicesForm service={service} />
      </div>
    </main>
  );
}

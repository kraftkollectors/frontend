import { DashboardServiceCard } from "@/components/dashboard";
import Link from 'next/link';
import paths from '@/utils/paths'
import { fetchArtisanServices, fetchUser } from "@/actions";
import { NotAnArtisan, Pagination } from "@/components";
import { staticMetadata } from "@/functions/metadata";
import { Metadata } from "next";

export const metadata:Metadata = staticMetadata({
  title: "KraftKollectors | My Services",
  description: "services provided by me"
})

export default async function Page() {
  const user = await fetchUser();
  if(!user || user == 'error') return <div className="info-box">An Error Occurred</div>
  if(!user.isArtisan) return <NotAnArtisan />
  
  const services = await fetchArtisanServices();
  if (services == 'error' || !services) return <div className="info-box">An Error Occurred</div>

  return (
    <div className="flex flex-col gap-3">
      {services.existingRecords.length == 0 ? <div className="info-box">No Services</div>
        : services.existingRecords.map((service) => (
          <DashboardServiceCard key={service._id} {...service} />
        ))}
      <Pagination
        className="py-2"
        baseUrl={paths.dashboardServices} pagination={services} />
      <div className="flex flex-col  items-center bg-light p-3 gap-3">
        <h1 className="text-black-300 text-title">Post a new service</h1>
        <Link href={paths.dashboardNewService} className="btn-primary w-fit py-2 px-5">Post Service</Link>
      </div>
    </div>
  );
}


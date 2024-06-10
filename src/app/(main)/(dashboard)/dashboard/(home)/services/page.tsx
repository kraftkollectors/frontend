import { DashboardServiceCard } from "@/components/dashboard";
import Link from 'next/link';
import paths from '@/utils/paths'
import { fetchArtisanServices } from "@/actions";
import { Pagination } from "@/components";
export default async function Page() {
  const services = await fetchArtisanServices();
  if (services == 'error' || !services) return <div className="info-box">An Error Occurred</div>

  return (
    <div className="flex flex-col gap-3">
      {services.existingRecords.length == 0 ? <div className="info-box">No saved Services</div>
        : services.existingRecords.map((service) => (
          <DashboardServiceCard key={service._id} {...service} />
        ))}
      <Pagination
        className="flex border rounded bg-light"
        baseUrl={paths.dashboardServices} pagination={services} />
      <div className="flex flex-col  items-center bg-light p-3 gap-3">
        <h1 className="text-black-300 text-title">Post a new service</h1>
        <Link href={paths.dashboardNewService} className="btn-primary w-fit py-2 px-5">Post Service</Link>
      </div>
    </div>
  );
}


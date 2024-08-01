import { DashboardServiceCard } from "@/components/dashboard";
import Link from "next/link";
import paths from "@/utils/paths";
import { fetchArtisanServices, fetchUser } from "@/actions";
import { NotAnArtisan, Pagination } from "@/components";
import { staticMetadata } from "@/functions/metadata";
import { Metadata } from "next";
import { buildUrlQuery } from "@/functions/helpers";
import { AppPageProps } from "@/utils/types/basicTypes";

export const metadata: Metadata = staticMetadata({
  title: "KraftKollectors | My Services",
  description: "services provided by me",
});

export default async function Page({ searchParams }: AppPageProps) {
  const user = await fetchUser();
  if (!user || user == "error")
    return <div className="info-box">An Error Occurred</div>;
  if (!user.isArtisan) return <NotAnArtisan />;

  const services = await fetchArtisanServices({
    params: buildUrlQuery(searchParams),
  });
  if (services == "error" || !services)
    return <div className="info-box">An Error Occurred</div>;

  return (
    <div className="flex flex-col gap-3">
      {services.existingRecords.length == 0 ? (
        <div className="info-box">No Services</div>
      ) : (
        services.existingRecords.map((service) => (
          <DashboardServiceCard key={service._id} {...service} />
        ))
      )}
      <Pagination
        className="mx-auto py-2"
        baseUrl={paths.dashboardServices}
        pagination={services}
      />
      <div className="flex flex-col items-center gap-3 bg-light p-3">
        <h1 className="text-title text-black-300">Post a new service</h1>
        <Link
          href={paths.dashboardNewService}
          className="btn-primary w-fit px-5 py-2"
        >
          Post Service
        </Link>
      </div>
    </div>
  );
}

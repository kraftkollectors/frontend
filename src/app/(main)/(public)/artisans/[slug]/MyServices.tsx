import { fetchArtisanServices } from "@/actions";
import { Pagination, ServiceCard } from "@/components";
import { paths } from "@/utils";

export default async function MyServices({userId}:{userId:string}) {
  const services = await fetchArtisanServices({isPublic: true, throwsError: false, params: userId});
  if (services == 'error' || !services) return <div className="info-box">An Error Occurred</div>
  
  return (
    <section id="Services" className="app-container py-6 bg-light-text">
      <h1 className="font-bold pb-4 text-title">My Services</h1>
      <div className="services-grid">
        {
          services.existingRecords.length < 1 ? <div className="info-box">No Services yet</div> :
        services.existingRecords.map((service) => (
          <ServiceCard key={service._id} {...service} />
        ))}
      </div>
      {services.totalPages > 1 && <Pagination pagination={services} baseUrl={paths.singleArtisan(userId + "#Services")} />}
    </section>
  );
}

import { ServiceCard } from "@/components";
import { dummyServices } from "@/utils/dummy";

export default function MyServices() {
  return (
    <section className="app-container py-6">
      <h1 className="font-bold pb-4 text-title">My Services</h1>
      <div className="services-grid">
        {dummyServices.map(service =>
          <ServiceCard key={service.id} {...service} />
        )}
      </div>
    </section>
  );
}

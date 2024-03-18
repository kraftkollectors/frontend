import { ServiceCard } from "@/components";
import { dummyServices } from "@/utils/dummy";

export default function MyServices() {
  return (
    <section className="app-container py-10">
      <h1 className="r-font-bold r-text-lg">My Services</h1>
      <div className="services-grid">
        {dummyServices.map(service =>
          <ServiceCard key={service.id} {...service} />
        )}
      </div>
    </section>
  );
}

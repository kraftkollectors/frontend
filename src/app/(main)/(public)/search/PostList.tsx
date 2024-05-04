import { ServiceCard } from "@/components";
import { dummyServices } from "@/utils/dummy";

export default function PostList() {
  return (
    <section className="app-container py-10">
      <div className="services-grid">
        {dummyServices.map((service) => (
          <ServiceCard key={service.id} {...service} />
        ))}
      </div>
    </section>
  );
}

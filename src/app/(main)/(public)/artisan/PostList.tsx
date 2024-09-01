import { ServiceCard } from "@/components";
import { Service } from "@/utils/types/service";

export default function PostList({services}:{services: Service[]}) {
  return (
    <section className="app-container py-6 md:py-10">
      <div className="services-grid">
        {services.map((service) => (
          <ServiceCard key={service._id} {...service} />
        ))}
      </div>
    </section>
  );
}

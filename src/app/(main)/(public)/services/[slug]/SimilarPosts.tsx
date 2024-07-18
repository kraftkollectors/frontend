import { ServiceCard } from "@/components";
import { Service } from "@/utils/types/service";

export default function SimilarPosts({items}:{items: Service[]}) {
  return (
    <section className="app-container py-10 bg-secondary-light">
      <h1 className="text-title font-bold pb-6">Similar Posts</h1>
      <div className="services-grid max-sm:!grid-cols-1">
        {items.map(service =>
          <ServiceCard key={service._id} {...service} />
        )}
      </div>
    </section>
  );
}

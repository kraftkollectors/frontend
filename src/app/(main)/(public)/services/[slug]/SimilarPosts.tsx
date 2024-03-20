import { ServiceCard } from "@/components";
import { dummyServices } from "@/utils/dummy";

export default function SimilarPosts() {
  return (
    <section className="app-container py-10 bg-secondary-light">
      <h1 className="text-title font-bold pb-6">Similar Posts</h1>
      <div className="services-grid">
        {dummyServices.map(service =>
          <ServiceCard key={service.id} {...service} />
        )}
      </div>
    </section>
  );
}

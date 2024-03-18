import { ServiceCard } from "@/components";

export default function MyServices() {
  return (
    <section className="app-container py-10">
      <h1 className="r-font-bold r-text-lg">My Services</h1>
      <div className="services-grid">
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
      </div>
    </section>
  );
}

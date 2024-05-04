import { DashboardServiceCard } from "@/components/dashboard";
export default function Page() {
  return (
    <div className="flex flex-col gap-3">
      {services.map((service) => (
        <DashboardServiceCard key={service.id} {...service} />
      ))}

      <div className="flex flex-col  items-center bg-light p-3 gap-3">
        <h1 className="text-black-300 text-title">Post a new service</h1>
        <button className="btn-primary w-fit p-2">Post Service</button>
      </div>
    </div>
  );
}

const services = [
  {
    img: "/images/auth-bg.png",
    title: "I will create the ultimate sound track for your event",
    price: "#20,000",
    id: "1",
  },
  {
    img: "/images/auth-bg.png",
    title: "I will create the ultimate sound track for your event",
    price: "#20,000",
    id: "1",
  },
];

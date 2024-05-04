import { DashboardSavedCard } from "@/components/dashboard/DashboardSavedCard";

export default function Page() {
  return (
    <div className="flex flex-col gap-3">
      {services.map((service) => (
        <DashboardSavedCard key={service.id} {...service} />
      ))}
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

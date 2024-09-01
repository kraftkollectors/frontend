import DashboardPage from "./DashboardPage";
import ProfileCard from "./ProfileCard";
import ProfileCategories from "./ProfileCategories";
import ServicesPage from "./services/page";

export default function Page() {

  return <div>
    <DashboardPage
      home={<div className="flex flex-col gap-4">
      <ProfileCard />
      <ProfileCategories />
    </div>}
      services={<ServicesPage />}
    />
  </div>;
}

import DashboardPage from "./DashboardPage";
import ProfileCard from "./ProfileCard";
import ProfileCategories from "./ProfileCategories";
import { dummyProfileCardData, dummyProfileData } from "./layout";
import ServicesPage from "./services/page";

export default function Page() {

  return <div>
    <DashboardPage
      home={<div className="flex flex-col gap-4">
      <ProfileCard {...dummyProfileData} />
      <ProfileCategories {...dummyProfileCardData} />
    </div>}
      services={<ServicesPage />}
    />
  </div>;
}

import { DashboardProfile } from "@/components/dashboard";
import DashBoardNav from "./DashBoardNav";
import ProfileCard from "./ProfileCard";
import ProfileCategories from "./ProfileCategories";


export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <main className="grid md:grid-cols-10 md:app-container py-10 bg-light md:bg-light-text gap-6">
      <div className="col-span-1 bg-light app-container md:hidden">
        <DashboardProfile />
      </div>
      <div className="col-span-3 flex flex-col gap-4 max-md:hidden">
        <ProfileCard  />
        <ProfileCategories />
      </div>
      <div className="col-span-full  md:col-span-7 flex flex-col gap-2 max-md:bg-light-text">
        <div className="bg-light border-b md:border w-full">
          <DashBoardNav />
        </div>
        <aside className=" max-md:app-container">
        {children}
        </aside>
      </div>
    </main>
  );
}

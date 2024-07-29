import { DashboardProfile } from "@/components/dashboard";
import DashBoardNav from "./DashBoardNav";
import ProfileCard from "./ProfileCard";
import ProfileCategories from "./ProfileCategories";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="md:app-container grid gap-6 bg-light py-10 md:grid-cols-10 md:bg-light-text">
      <div className="app-container col-span-1 bg-light md:hidden">
        <DashboardProfile />
      </div>
      <div className="col-span-4 flex flex-col gap-4 max-md:hidden">
        <ProfileCard />
        <ProfileCategories />
      </div>
      <div className="col-span-full flex flex-col gap-2 max-md:bg-light-text md:col-span-6">
        <div className="w-full border-b bg-light md:border">
          <DashBoardNav />
        </div>
        <aside className="max-md:app-container">{children}</aside>
      </div>
    </main>
  );
}

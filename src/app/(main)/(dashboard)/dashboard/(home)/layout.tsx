import { DashboardProfile } from "@/components/dashboard";
import DashBoardNav from "./DashBoardNav";
import ProfileCard, { ProfileCardprops } from "./ProfileCard";
import ProfileCategories, { ProfileCategoriesProps } from "./ProfileCategories";

export const dummyProfileData: ProfileCardprops = {
  image: "/images/auth-bg.png",
  fullName: "John Doe",
  email: "john.doe@gmail.com",
  displayName: "John Doe",
  availability: "Available",
  location: "New York, USA",
  memberSince: "2022",
  phoneNumber: "0123456789",
  website: "www.johndeo.com",
  facebook: "https://www.facebook.com/johndoe",
  instagram: "https://www.instagram.com/johndoe",
  x: "https://www.twitter.com/johndoe",
  linkedin: "https://www.linkedin.com/johndoe",
};
export const dummyProfileCardData: ProfileCategoriesProps = {
  description: `Lorem ipsum dolor sit amet consectetur. Elit consequat dis ut quis pellentesque orci. Turpis diam iaculis id tristique. Et viverra erat amet pulvinar cras tortor felis leo eget. Eleifend aliquet pretium phasellus nisl porttitor. Ullamcorper laoreet ipsum venenatis amet. A ultricies consequat pretium duis blandit ut Et viverra erat amet pulvinar cras tortor felis leo eget. Eleifend aliquet pretium phasellus nisl porttitor. ut `,

  awayMessage: `Lorem ipsum dolor sit amet consectetur. Elit consequat dis ut quis pellentesque orci. Turpis di`,
};
export default function Layout({ children }: { children: React.ReactNode }) {

  return (
    <main className="grid md:grid-cols-10 md:app-container py-10 bg-light md:bg-light-text gap-6">
      <div className="col-span-1 bg-light app-container md:hidden">
        <DashboardProfile {...dummyProfileData} />
      </div>
      <div className="col-span-3 flex flex-col gap-4 max-md:hidden">
        <ProfileCard {...dummyProfileData} />
        <ProfileCategories {...dummyProfileCardData} />
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

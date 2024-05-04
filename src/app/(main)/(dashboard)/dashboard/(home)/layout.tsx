import DashBoardNav from "./DashBoardNav";
import ProfileCard, { ProfileCardprops } from "./ProfileCard";
import ProfileCategories, { ProfileCategoriesProps } from "./ProfileCategories";

export default function Layout({ children }: { children: React.ReactNode }) {
  const data: ProfileCardprops = {
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
  const profileCardData: ProfileCategoriesProps = {
    description: `Lorem ipsum dolor sit amet consectetur. Elit consequat dis ut quis pellentesque orci. Turpis diam iaculis id tristique. Et viverra erat amet pulvinar cras tortor felis leo eget. Eleifend aliquet pretium phasellus nisl porttitor. Ullamcorper laoreet ipsum venenatis amet. A ultricies consequat pretium duis blandit ut Et viverra erat amet pulvinar cras tortor felis leo eget. Eleifend aliquet pretium phasellus nisl porttitor. ut `,

    awayMessage: `Lorem ipsum dolor sit amet consectetur. Elit consequat dis ut quis pellentesque orci. Turpis di`,
  };

  return (
    <main className="grid grid-cols-10 app-container py-10 bg-light-text gap-6">
      <div className="col-span-3 flex flex-col gap-4 max-md:hidden">
        <ProfileCard {...data} />
        <ProfileCategories {...profileCardData} />
      </div>
      <div className="col-span-full  md:col-span-7 flex flex-col gap-2">
        <div className="bg-light border w-full">
          <DashBoardNav />
        </div>
        {children}
      </div>
    </main>
  );
}

import { ReadMoreReadLess, SocialIcons } from "@/components";
import { Certificate } from "@/components/certificate/CertificateCard";
import { Education } from "@/components/education/EducationCard";
import { SocialIconsProps } from "@/components/ui/SocialIcons";
import { ArtisanEducation } from "@/utils/types/artisanTypes";
import Educations from "./Educations";
import { Suspense } from "react";
import Certificates from "./Certificates";

export type AboutProps = {
  about: string;
  userId: string;
};

export default function About({
  about,
  userId
}: AboutProps) {
  return (
    <div className="md:col-span-6 lg:col-span-7 flex flex-col gap-3 p-4 md:p-6 bg-light border rounded-md">
      <div className="flex flex-col gap-1 pb-2 border-b">
        <h1 className="font-bold ">About Me</h1>
        <ReadMoreReadLess className=" text-black-400">{about}</ReadMoreReadLess>
      </div>
      <Suspense fallback={<div className="skeleton h-20"></div>}>
        <Educations userId={userId} />
      </Suspense>
      <Suspense fallback={<div className="skeleton h-20"></div>}>
        <Certificates userId={userId} />
      </Suspense>
    </div>
  );
}

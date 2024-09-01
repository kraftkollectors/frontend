import { ReadMoreReadLess, SocialIcons } from "@/components";
import { Certificate } from "@/components/certificate/CertificateCard";
import { Education } from "@/components/education/EducationCard";
import { SocialIconsProps } from "@/components/ui/SocialIcons";
import { ArtisanEducation } from "@/utils/types/artisanTypes";
import Educations from "./Educations";
import { Suspense } from "react";
import Certificates from "./Certificates";

export type AboutProps = {
  about?: string;
  userId: string;
};

export default function About({ about, userId }: AboutProps) {
  return (
    <div className="flex flex-col gap-3 rounded-md border bg-light p-4 md:col-span-6 md:p-6 lg:col-span-7">
      <div className="flex flex-col gap-1 border-b pb-2">
        <h1 className="font-bold">About Me</h1>
        <ReadMoreReadLess className="text-black-400">{about}</ReadMoreReadLess>
      </div>
      {!!about && (
        <>
          <Suspense fallback={<div className="skeleton h-20"></div>}>
            <Educations userId={userId} />
          </Suspense>
          <Suspense fallback={<div className="skeleton h-20"></div>}>
            <Certificates userId={userId} />
          </Suspense>
        </>
      )}
    </div>
  );
}

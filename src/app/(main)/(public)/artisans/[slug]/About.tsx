import { SocialIcons } from "@/components";
import { Certificate } from "@/components/certificate/CertificateCard";
import { Education } from "@/components/education/EducationCard";
import { SocialIconsProps } from "@/components/ui/SocialIcons";
import { ArtisanEducation } from "@/utils/types/artisanTypes";

export type AboutProps = {
  about: string;
  education: Education[];
  certifications: Certificate[];
};

export default function About({
  about,
  education,
  certifications,
}: AboutProps) {
  return (
    <div className="md:col-span-6 lg:col-span-7 flex flex-col gap-3 p-4 md:p-6 bg-light border rounded-md">
      <div className="flex flex-col gap-1 pb-2 border-b">
        <h1 className="font-bold ">About Me</h1>
        <p className=" text-black-400">{about}</p>
      </div>
      <div className="flex flex-col gap-1 pb-2 border-b">
        <h1 className="font-bold ">Education</h1>
        {education.map(({ degree, university: universityName, year: graduation }, i) => (
          <div key={i} className="pb-1 flex flex-col gap-1">
            <p className="text-black-900">{universityName}</p>
            <p className="text-black-300 font-semibold text-sm">{degree}</p>
            <p className="text-black-300 font-semibold text-sm">
              Year of graduation {graduation}
            </p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="font-bold ">Certifications</h1>
        {certifications.map(({ certificate, certifiedBy, year }, i) => (
          <div key={i} className="pb-1 flex flex-col gap-1">
            <p className="text-black-900">{certificate}</p>
            <p className="text-black-300 font-semibold text-sm">
              {certifiedBy}
            </p>
            <p className="text-black-300 font-semibold text-sm">
              Year of graduation {year}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

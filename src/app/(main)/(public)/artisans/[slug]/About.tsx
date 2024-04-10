import { SocialIcons } from "@/components";
import { SocialIconsProps } from "@/components/ui/SocialIcons";
import { ArtisanEducation } from "@/utils/types/artisanTypes";

export type AboutProps = {
  about: string;
  education: ArtisanEducation[];
  socials: SocialIconsProps;
};

export default function About({ about, education, socials }: AboutProps) {
  return (
    <div className="md:col-span-6 flex flex-col gap-3">
      <div className="flex flex-col gap-1 max-md:pb-2 max-md:border-b">
        <h1 className="font-bold ">About Me</h1>
        <p className=" text-black-400">
          {about}
        </p>
      </div>
      <div className="flex flex-col gap-1 max-md:pb-2 max-md:border-b">
        <h1 className="font-bold ">Education</h1>
        {education.map(({ degree, school }, i) =>
          <p key={i} className=" text-black-600 pb-1 flex flex-col">
            <span>
              {school}
            </span>
            <span className="text-black-400">
              {degree}
            </span>
          </p>
        )}
      </div>
      <div className="flex flex-col gap-1 max-md:pb-2 max-md:border-b">
        <h1 className="font-bold ">Social Links</h1>
        <div className=" text-black-600 flex gap-3">
          <SocialIcons {...socials} />
        </div>
      </div>
    </div>
  );
}

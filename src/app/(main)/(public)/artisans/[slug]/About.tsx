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
        <h1 className="r-font-semibold text-sm">About Me</h1>
        <p className="text-sm text-dark-gray">
          {about}
        </p>
      </div>
      <div className="flex flex-col gap-1 max-md:pb-2 max-md:border-b">
        <h1 className="r-font-semibold text-sm">Education</h1>
        {education.map(({ degree, school }, i) =>
          <p key={i} className="text-sm text-dark-gray pb-1 flex flex-col">
            <span>
              {school}
            </span>
            <span className="opacity-80">
              {degree}
            </span>
          </p>
        )}
      </div>
      <div className="flex flex-col gap-1 max-md:pb-2 max-md:border-b">
        <h1 className="r-font-semibold text-sm">Social Links</h1>
        <div className="text-sm text-dark-gray flex gap-3">
          <SocialIcons {...socials} />
        </div>
      </div>
    </div>
  );
}

import { ArtisanEducation } from "@/utils/types/artisanTypes";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";

export type AboutProps = {
  about:string;
  education: ArtisanEducation[];
  socials: SocialIconsProps;
}

export default function About({about, education, socials}:AboutProps) {
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
        {
          education.map(({degree, school}, i)=>
          <p key={i} className="text-sm text-dark-gray pb-1 flex flex-col">
          <span>{school}</span>
          <span className="opacity-80">{degree}</span>
        </p>
          )
        }
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


type SocialIconsProps = {
  x?:string;
  facebook?:string;
  instagram?:string;
  linkedin?:string;
}
function SocialIcons({x,facebook,linkedin,instagram}:SocialIconsProps){
  const className = "p-1 hover:opacity-100 rounded-2xl border hover:bg-gray-100";
  return <>
  {
    x && <Link href={x} className={className}><FaXTwitter /></Link>
  }
  {
    linkedin && <Link href={linkedin} className={className}><FaLinkedin /></Link>
  }
  {
    instagram && <Link href={instagram} className={className}><FaInstagram /></Link>
  }
  {
    facebook && <Link href={facebook} className={className}><FaFacebook /></Link>
  }
  </>
}
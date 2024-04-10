import Link from "next/link";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";
import {SlSocialLinkedin} from 'react-icons/sl';
import {LuFacebook} from 'react-icons/lu';

export type SocialIconsProps = {
  x?:string;
  facebook?:string;
  instagram?:string;
  linkedin?:string;
}
export function SocialIcons({x,facebook,linkedin,instagram}:SocialIconsProps){
  const className = "p-2 hover:opacity-100 rounded-2xl border hover:bg-gray-100";
  return <>
  {
    x && <Link href={x} className={className}><FaXTwitter /></Link>
  }
  {
    linkedin && <Link href={linkedin} className={className}><SlSocialLinkedin /></Link>
  }
  {
    instagram && <Link href={instagram} className={className}><FaInstagram /></Link>
  }
  {
    facebook && <Link href={facebook} className={className}><LuFacebook /></Link>
  }
  </>
}
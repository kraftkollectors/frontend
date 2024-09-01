import Link from "next/link";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";
import { SlSocialLinkedin } from "react-icons/sl";
import { LuFacebook } from "react-icons/lu";

export type SocialIconsProps = {
  twitter?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
};
export function SocialIcons({
  twitter: x,
  facebook,
  linkedin,
  instagram,
}: SocialIconsProps) {
  const className =
    "p-2 hover:opacity-100 rounded-2xl border hover:bg-gray-100";
  return (
    <>
      {x && (
        <Link href={x} title="x" className={className}>
          <FaXTwitter />
        </Link>
      )}
      {linkedin && (
        <Link href={linkedin} title="linkedin" className={className}>
          <SlSocialLinkedin />
        </Link>
      )}
      {instagram && (
        <Link href={instagram} title="instagram" className={className}>
          <FaInstagram />
        </Link>
      )}
      {facebook && (
        <Link href={facebook} title="facebook" className={className}>
          <LuFacebook />
        </Link>
      )}
    </>
  );
}

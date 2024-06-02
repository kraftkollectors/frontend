'use client'

import { FaRegEnvelope, FaRegHeart } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
import Link from "next/link";
import paths from "@/utils/paths";
import ProfileDropdown from "./ProfileDropdown";
import { useUserStore } from "@/state";
import { fallbackImage } from "@/functions/helpers";

export default function NavLinks() {
  const user = useUserStore((s) => s.user);
  return (
    <nav className="flex w-fit gap-4 items-center max-md:hidden">
      {links.map((link) => (
        <NavLink key={link.label} {...link} />
      ))}
      <ProfileDropdown>
        <img
          height={80}
          width={80}
          src={fallbackImage(user?.image)}
          alt={user?.userName}
          title={user?.userName}
          className=" size-8 avatar cursor-pointer overflow-hidden"
        />
      </ProfileDropdown>
    </nav>
  );
}

const links: NavLinkProps[] = [
  {
    label: "Saved",
    icon: <FaRegHeart />,
    href: paths.dashboardSaved,
  },
  {
    label: "Messages",
    icon: <FaRegEnvelope />,
    href: paths.dashboardChats,
  },
  {
    label: "Support",
    icon: <BiSupport />,
    href: paths.support,
  },
];

type NavLinkProps = {
  icon: React.ReactNode;
  label: string;
  href: string;
};

function NavLink({ icon, label, href }: NavLinkProps) {
  return (
    <Link href={href}>
      <div className="flex flex-col items-center justify-center hover:text-black text-black-400">
        <span className="text-body">{icon}</span>
        <span className="text-label font-[500]">{label}</span>
      </div>
    </Link>
  );
}

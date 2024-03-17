import React from "react";
import { FaEnvelope, FaHeart, FaMicrophone } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

export default function NavLinks() {
  return (
    <nav className="flex w-fit gap-4 items-center">
      {links.map(link => <NavLink key={link.label} {...link} />)}
      <Image
        height={100}
        width={100}
        src="/images/auth-bg.png"
        alt=""
        className=" size-8 avatar"
      />
    </nav>
  );
}

const links: NavLinkProps[] = [
  {
    label: "Saved",
    icon: <FaHeart />,
    href: ""
  },
  {
    label: "Messages",
    icon: <FaEnvelope />,
    href: ""
  },
  {
    label: "Support",
    icon: <FaMicrophone />,
    href: ""
  }
];

type NavLinkProps = {
  icon: React.ReactNode;
  label: string;
  href: string;
};

function NavLink({ icon, label, href }: NavLinkProps) {
  return (
    <Link href={href}>
      <div className="flex flex-col items-center justify-center hover:text-primary">
        <span className="text-sm">
          {icon}
        </span>
        <span className="text-xs font-[500]">
          {label}
        </span>
      </div>
    </Link>
  );
}

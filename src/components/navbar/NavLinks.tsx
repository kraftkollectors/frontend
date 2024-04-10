import React from "react";
import { FaRegEnvelope, FaRegHeart } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
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
    icon: <FaRegHeart />,
    href: ""
  },
  {
    label: "Messages",
    icon: <FaRegEnvelope />,
    href: ""
  },
  {
    label: "Support",
    icon: <BiSupport />,
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
        <span className="text-body">
          {icon}
        </span>
        <span className="text-label font-[500]">
          {label}
        </span>
      </div>
    </Link>
  );
}

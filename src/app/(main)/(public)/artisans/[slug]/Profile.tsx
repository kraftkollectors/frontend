import ProfileInfoLine from "@/app/(main)/(dashboard)/dashboard/(home)/ProfileInfoLine";
import { SocialIcons } from "@/components";
import { SocialIconsProps } from "@/components/ui/SocialIcons";
import Link from "next/link";
import { CiMail } from "react-icons/ci";
import { FaRegEnvelope } from "react-icons/fa6";
import { IoCallOutline } from "react-icons/io5";
import { LuPhone } from "react-icons/lu";
import { MdOutlineLocationOn } from "react-icons/md";
import { TbWorld } from "react-icons/tb";

export type ProfileProps = {
  img: string;
  socials: SocialIconsProps;
  name: string;
  profession: string;
  location: string;
  memberSince: string;
  phone?: string;
  email?: string;
  website?: string;
};

/* eslint-disable @next/next/no-img-element */
export default function Profile({
  email,
  img,
  location,
  memberSince,
  name,
  phone,
  profession,
  socials,
  website,
}: ProfileProps) {
  return (
    <div className="flex flex-col gap-2 w-full md:col-span-4 items-center justify-center md:p-6 md:bg-light md:border rounded-md">
      <img src={img} alt="auth image" className="size-20 rounded-full" />
      <p className="font-semibold text-title text-black-900">{name}</p>
      <p className="text-black-400">{profession}</p>
      <p className="flex items-center text-label">
        <MdOutlineLocationOn />
        {location}
      </p>
      <p className="text-label">member since {memberSince}</p>
      <div className="flex gap-2 w-full justify-center">
        <Link href="/" className="btn-primary p-2 w-5/12">
          <FaRegEnvelope />
          message
        </Link>
        <Link href="/" className="btn-primary-border p-2 w-5/12">
          <IoCallOutline />
          phone
        </Link>
      </div>
      <div className="w-full my-3 md:border-b"></div>
      <div className="flex flex-col gap-2 w-full max-md:bg-light max-md:border max-md:rounded-md max-md:p-4">
        <div className="flex flex-col gap-2 w-full">
          <p className="text-body font-semibold">Contact Info</p>
          <ProfileInfoLine
            title="Phone Number"
            value={"phoneNumber"}
            icon={<LuPhone />}
          />
          <ProfileInfoLine
            title="Email"
            value={"kesh@gmail.com"}
            icon={<CiMail />}
          />
          <ProfileInfoLine
            title="website"
            value={"kesh.com"}
            icon={<TbWorld />}
          />
        </div>
        <div className="w-full my-3 border-b"></div>
        <div className="flex gap-1  justify-between items-center w-full ">
          <h1 className="font-bold ">Social Links</h1>
          <div className=" text-black-600 flex gap-3">
            <SocialIcons {...socials} />
          </div>
        </div>
      </div>
    </div>
  );
}

import { FaLocationDot, FaMessage, FaPhone, FaRegClock } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import { SocialIcons } from "@/components";

export default function Profile() {
  return (
    <div className="lg:col-span-4 h-fit rounded-md bg-light p-5 shadow-lg flex flex-col items-center justify-center text-center">
      <Image
        height={200}
        width={200}
        src={"/images/auth-bg.png"}
        alt={"hello"}
        className="avatar size-28"
      />
      <div className="flex flex-col gap-1 max-md:items-center max-md:text-center">
        <h1 className="r-font-bold r-text-lg">Prince Maxwell</h1>
        <h2 className="text-dark-gray text-sm">4d engineer</h2>
        <h3 className="flex gap-1 text-xs text-dark-gray justify-center">
          <FaLocationDot />
          <span>abuja</span>
        </h3>
        <h4 className="flex gap-1 text-xs text-dark-gray justify-center">
          <FaRegClock />
          <span>08:00 AM - 04:00 PM</span>
        </h4>
      </div>
      <div className="grid grid-cols-2 gap-2 py-4 w-full">
        <Link href={""} className="btn-primary-border">
          <FaPhone />Phone Call
        </Link>
        <Link href={""} className="btn-primary">
          <FaMessage />Message
        </Link>
      </div>
      <div className="pb-3">
        <h1 className="r-font-semibold text-sm text-dark-gray pb-2 opacity-60">
          Social Links
        </h1>
        <div className="flex justify-center items-center w-fit gap-3">
          <SocialIcons x="x.com" instagram="ig.com" />
        </div>
      </div>
      <div className="opacity-60">
        <h1 className="r-font-semibold text-sm text-dark-gray">
          Member since April 25, 2020
        </h1>
        <div className="flex justify-center items-center w-full divide-x">
          <button className="link-btn px-3 py-1">Report</button>
          <button className="link-btn px-3 py-1">Block</button>
        </div>
      </div>
    </div>
  );
}

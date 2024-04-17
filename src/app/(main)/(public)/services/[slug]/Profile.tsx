import { FaLocationDot, FaMessage, FaPhone, FaRegClock } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import { SocialIcons } from "@/components";
import Report from "@/components/Report";
import ReportDialog from "@/components/Report";

export default function Profile() {
  return (
    <div className="md:col-span-4 h-fit rounded-md bg-light p-5 md:shadow-lg flex flex-col items-center justify-center text-center">
      <Image
        height={200}
        width={200}
        src={"/images/auth-bg.png"}
        alt={"hello"}
        className="avatar size-28"
      />
      <div className="flex flex-col gap-1 pt-3 max-md:items-center max-md:text-center">
        <h1 className="r-font-bold text-title">Prince Maxwell</h1>
        <h2 className="text-black-300 text-label">4d engineer</h2>
        <h3 className="flex pt-2 gap-1 text-label text-black-300 justify-center items-center">
          <FaLocationDot />
          <span>abuja</span>
        </h3>
        <h4 className="flex gap-1 text-label text-black-300 justify-center items-center">
          <FaRegClock />
          <span>08:00 AM - 04:00 PM</span>
        </h4>
      </div>
      <div className="grid grid-cols-2 gap-2 py-6 w-full">
        <Link href={""} className="btn-primary-border">
          <FaPhone />
          Phone Call
        </Link>
        <Link href={""} className="btn-primary">
          <FaMessage />
          Message
        </Link>
      </div>
      <div className="pb-3">
        <h1 className="r-font-semibold text-label text-black-200 pb-2 opacity-60">
          Social Links
        </h1>
        <div className="flex justify-center items-center w-fit gap-3">
          <SocialIcons x="x.com" instagram="ig.com" />
        </div>
      </div>
      <div className="text-black-200">
        <h1 className="r-font-semibold text-label">
          Member since April 25, 2020
        </h1>
        <div className="flex justify-center items-center w-full divide-x">
          <ReportDialog>
            <button className="link-btn px-3 py-1">Report</button>
          </ReportDialog>
          <button className="link-btn px-3 py-1">Block</button>
        </div>
      </div>
    </div>
  );
}

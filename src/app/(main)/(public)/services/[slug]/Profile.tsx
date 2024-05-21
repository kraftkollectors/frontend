import { FaLocationDot, FaMessage, FaPhone, FaRegClock } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import { SocialIcons } from "@/components";
import ReportDialog from "@/components/Report";
import ProfileInfoLine from "@/app/(main)/(dashboard)/dashboard/(home)/ProfileInfoLine";
import { CiMail } from "react-icons/ci";
import { LuPhone } from "react-icons/lu";
import { TbMessageReport, TbWorld } from "react-icons/tb";
import { HiOutlineMail } from "react-icons/hi";

export default function Profile() {
  return (
    <div className="md:col-span-4 h-fit rounded-md bg-light p-4 md:p-6 border md:shadow-lg flex flex-col items-center justify-center text-center">
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
      </div>
      <div className="grid max-md:w-9/12 md:grid-cols-2 gap-2 py-6 w-full">
        <Link href={""} className="btn-primary-border !py-2">
          <FaPhone />
          Phone Call
        </Link>
        <Link href={""} className="btn-primary !py-2">
          <FaMessage />
          Message
        </Link>
      </div>
      <div className="flex flex-col gap-2 w-full items-start pb-2 border-b [&>*]:w-full">
          <p className="text-body font-semibold text-start text-black-400">Contact Info</p>
          <ProfileInfoLine
            title="Work Hour"
            value={"8:00 am - 4:00 pm"}
            icon={<FaRegClock />}
          />
          <ProfileInfoLine
            title="Email"
            value={"kesh@gmail.com"}
            icon={<HiOutlineMail />}
          />
          <ProfileInfoLine
            title="website"
            value={"kesh.com"}
            icon={<TbWorld />}
          />
        </div>
      <div className="py-3 flex justify-between w-full items-center">
        <h1 className="r-font-semibold text-label text-black-300 pb-2 opacity-60">
          Social Links
        </h1>
        <div className="flex justify-center items-center w-fit gap-3">
          <SocialIcons x="x.com" instagram="ig.com" />
        </div>
      </div>
      <div className="flex w-full justify-end">
          <ReportDialog>
            <button className="btn-dark-border !text-label px-3 py-1">
              <TbMessageReport />
              <span>Report</span>
            </button>
          </ReportDialog>
      </div>
    </div>
  );
}

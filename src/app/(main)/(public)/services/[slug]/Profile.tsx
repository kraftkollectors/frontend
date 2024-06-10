/* eslint-disable @next/next/no-img-element */
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
import { paths } from "@/utils";
import { fetchUser } from "@/actions";
import { fetchArtisan } from "@/actions/fetch/fetchArtisan";
import { Artisan } from "@/utils/types/artisan";
import { debugLog, fallbackImage } from "@/functions/helpers";
import { notFound } from "next/navigation";

export default async function Profile({ userId }: { userId: string; }) {
  // debugLog({userId})
  const user = await fetchUser({ isPublic: true, params: userId });
  if (user == 'error') return;
  if (!user?.isArtisan) notFound()

  let art = await fetchArtisan({ isPublic: true, params: userId });
  if (art == 'error' || !art) throw new Error("Connection error")



  return (
    <div className="md:col-span-4 h-fit rounded-md bg-light p-4 md:p-6 border md:shadow-lg flex flex-col items-center justify-center text-center">
      <Link href={paths.artisan(userId)}>
        <img
          height={112}
          width={112}
          src={fallbackImage(user.image)}
          alt={user.userName}
          className="avatar size-28"
        />
      </Link>
      <div className="flex flex-col gap-1 pt-3 max-md:items-center max-md:text-center">
      <Link href={paths.artisan(userId)} className="r-font-bold text-title">{art.businessName}</Link>
        <h2 className="text-black-300 text-label">{art.areaOfSpecialization}</h2>
        <h3 className="flex pt-2 gap-1 text-label text-black-300 justify-center items-center">
          <FaLocationDot />
          <span>{art.lga}, {art.state}</span>
        </h3>
      </div>
      <div className="grid max-md:w-9/12 md:grid-cols-2 gap-2 py-6 w-full">
        {art.phoneNumber && <Link href={"tel:"+art.phoneNumber} className="btn-primary-border !py-2">
          <FaPhone />
          Phone Call
        </Link>}
        <Link href={paths.dashboardSingleChat(userId)} className="btn-primary !py-2">
          <FaMessage />
          Message
        </Link>
      </div>
      <div className="flex flex-col gap-2 w-full items-start pb-2 border-b [&>*]:w-full">
        <p className="text-body font-semibold text-start text-black-400">Contact Info</p>
        <ProfileInfoLine
          title="Work Hour"
          value={`${art.workHourFrom} - ${art.workHourTo}`}
          icon={<FaRegClock />}
        />
        <ProfileInfoLine
          title="Email"
          value={user.email}
          icon={<HiOutlineMail />}
        />
        {art.website && <ProfileInfoLine
          title="website"
          value={<a
            className="link-btn text-body !font-normal"
            href={art?.website}
            target="_blank"
          >
            {art.website}
          </a>}
          icon={<TbWorld />}
        />}
      </div>
      <div className="py-3 flex justify-between w-full items-center">
        <h1 className="r-font-semibold text-label text-black-300 pb-2 opacity-60">
          Social Links
        </h1>
        <div className="flex justify-center items-center w-fit gap-3">
          <SocialIcons {...art} />
        </div>
      </div>
      <div className="flex w-full justify-end">
        <ReportDialog reportedId={userId}>
          <button className="btn-dark-border !text-label px-3 py-1">
            <TbMessageReport />
            <span>Report</span>
          </button>
        </ReportDialog>
      </div>
    </div>
  );
}

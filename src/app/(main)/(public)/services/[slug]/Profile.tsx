/* eslint-disable @next/next/no-img-element */
import { FaLocationDot, FaMessage, FaPhone, FaRegClock } from "react-icons/fa6";
import Link from "next/link";
import { SocialIcons } from "@/components";
import ReportDialog from "@/components/Report";
import ProfileInfoLine from "@/app/(main)/(dashboard)/dashboard/(home)/ProfileInfoLine";
import { TbMessageReport, TbWorld } from "react-icons/tb";
import { HiOutlineMail } from "react-icons/hi";
import { paths } from "@/utils";
import { fetchUser } from "@/actions";
import { fetchArtisan } from "@/actions/fetch/fetchArtisan";
import { fallbackImage } from "@/functions/helpers";
import { notFound } from "next/navigation";
import { formatTime } from "@/functions/date";
import UserProfileSkeleton from "@/components/skeletons/UserProfileSkeleton";
import AppIcons from "@/components/AppIcons";
import ArtisanNotAvailableModal from "@/components/modals/ArtisanNotAvailableModal";
import { FiPhone } from "react-icons/fi";

export default async function Profile({ userId }: { userId: string }) {
  // debugLog({userId})
  const user = await fetchUser({ isPublic: true, params: userId });
  if (user == "error") return <UserProfileSkeleton />;
  if (!user?.isArtisan) notFound();

  let art = await fetchArtisan({ isPublic: true, params: userId });
  if (art == "error" || !art) throw new Error("Connection error");

  return (
    <div className="flex h-fit flex-col items-center justify-center rounded-md border bg-light p-4 text-center md:col-span-4 md:p-6 md:shadow-lg">
      <Link href={paths.singleArtisan(userId)}>
        <img
          height={112}
          width={112}
          src={fallbackImage(user.image)}
          alt={user.userName}
          className="avatar size-28"
        />
      </Link>
      <div className="flex flex-col gap-1 pt-3 max-md:items-center max-md:text-center">
        <Link
          href={paths.singleArtisan(userId)}
          className="r-font-bold text-title"
        >
          {art.businessName}
        </Link>
        <h2 className="text-label text-black-300">
          {art.areaOfSpecialization}
        </h2>
        <h3 className="flex items-center justify-center gap-1 pt-2 text-label text-black-300">
          <FaLocationDot />
          <span>
            {art.lga}, {art.state}
          </span>
        </h3>
      </div>
      <div className="grid w-full gap-2 py-6 max-md:w-9/12 md:grid-cols-2">
        <Link
          href={paths.dashboardSingleChat(userId) + "?serviceId=" + art._id}
          className="btn-primary !py-2"
        >
          <AppIcons.Messages />
          Message
        </Link>
        {art.phoneNumber && (
          <ArtisanNotAvailableModal {...art}>
            <Link
              target="_blank"
              href={"tel:" + art.phoneNumber}
              className="btn-primary-border !py-2"
            >
              <FiPhone />
              Phone Call
            </Link>
          </ArtisanNotAvailableModal>
        )}
      </div>
      <div className="flex w-full flex-col items-start gap-2 border-b pb-2 [&>*]:w-full">
        <p className="text-start text-body font-semibold text-black-400">
          Contact Info
        </p>
        <ProfileInfoLine
          title="Work Hour"
          value={`${formatTime(art.workHourFrom)} - ${formatTime(art.workHourTo)}`}
          icon={<FaRegClock />}
        />
        <ProfileInfoLine
          title="Email"
          value={user.email}
          icon={<HiOutlineMail />}
        />
        {art.website && (
          <ProfileInfoLine
            title="website"
            value={
              <a
                className="link-btn text-body !font-normal"
                href={art?.website}
                target="_blank"
              >
                {art.website}
              </a>
            }
            icon={<TbWorld />}
          />
        )}
      </div>
      <div className="flex w-full items-center justify-between py-3">
        <h1 className="r-font-semibold pb-2 text-label text-black-500 opacity-60">
          Social Links
        </h1>
        <div className="flex w-fit items-center justify-center gap-3">
          <SocialIcons {...art} />
        </div>
      </div>
      <div className="flex w-full justify-end">
        <ReportDialog reportedId={userId}>
          <button className="btn-dark-border px-3 py-1 !text-label">
            <TbMessageReport />
            <span>Report</span>
          </button>
        </ReportDialog>
      </div>
    </div>
  );
}

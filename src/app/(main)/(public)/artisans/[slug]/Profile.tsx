import ProfileInfoLine from "@/app/(main)/(dashboard)/dashboard/(home)/ProfileInfoLine";
import { SocialIcons } from "@/components";
import AppIcons from "@/components/AppIcons";
import ArtisanNotAvailableModal from "@/components/modals/ArtisanNotAvailableModal";
import { SocialIconsProps } from "@/components/ui/SocialIcons";
import { paths } from "@/utils";
import { Artisan } from "@/utils/types/artisan";
import Link from "next/link";
import { CiMail } from "react-icons/ci";
import { FaRegEnvelope } from "react-icons/fa6";
import { FiPhone } from "react-icons/fi";
import { IoCallOutline } from "react-icons/io5";
import { LuPhone } from "react-icons/lu";
import { MdOutlineLocationOn } from "react-icons/md";
import { TbWorld } from "react-icons/tb";

export type ProfileProps = {
  img: string;
  socials?: SocialIconsProps;
  name: string;
  profession?: string;
  location?: string;
  memberSince: string;
  phone?: string;
  email?: string;
  website?: string;
  userId: string;
  artisan?: Artisan;
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
  userId,
  artisan,
}: ProfileProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 rounded-md md:col-span-4 md:border md:bg-light md:p-6">
      <img src={img} alt="profile image" className="avatar profile-img size-20" />
      <h1 className="text-center text-title font-semibold text-black-900">
        {name}
      </h1>
      {profession && <h2 className="text-black-400">{profession}</h2>}
      {location && (
        <p className="flex items-center text-label">
          <MdOutlineLocationOn />
          {location}
        </p>
      )}
      <p className="text-label">member since {memberSince}</p>
      {artisan && (
        <>
          <div className="grid w-full gap-2 py-6 max-md:w-9/12 md:grid-cols-2">
            <Link
              href={paths.dashboardSingleChat(userId)}
              className="btn-primary !py-2"
            >
              <AppIcons.Messages />
              Message
            </Link>
            {phone && (
              <ArtisanNotAvailableModal {...artisan}>
                <Link
                  target="_blank"
                  href={"tel:" + phone}
                  className="btn-primary-border !py-2"
                >
                  <FiPhone />
                  Phone Call
                </Link>
              </ArtisanNotAvailableModal>
            )}
          </div>
          <div className="my-3 w-full md:border-b"></div>
          <div className="flex w-full flex-col gap-2 max-md:rounded-md max-md:border max-md:bg-light max-md:p-4">
            <div className="flex w-full flex-col gap-2">
              <p className="text-body font-semibold">Contact Info</p>
              <ProfileInfoLine
                title="Phone Number"
                value={phone}
                icon={<LuPhone />}
              />
              <ProfileInfoLine
                title="Email"
                value={
                  <a
                    target="_blank"
                    className="link-btn text-body !font-normal"
                    href={"mailto:" + email}
                  >
                    {email}
                  </a>
                }
                icon={<CiMail />}
              />
              {website && (
                <ProfileInfoLine
                  title="website"
                  value={
                    <a
                      target="_blank"
                      className="link-btn text-body !font-normal"
                      href={website}
                    >
                      {website}
                    </a>
                  }
                  icon={<TbWorld />}
                />
              )}
            </div>
            <div className="my-3 w-full border-b"></div>
            <div className="flex w-full items-center justify-between gap-1">
              <h1 className="font-semibold text-black-500">Social Links</h1>
              <div className="flex gap-3 text-black-600">
                <SocialIcons {...socials} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

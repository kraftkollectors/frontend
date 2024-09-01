"use client";

import { LuPhone, LuUser2 } from "react-icons/lu";
import ProfileInfoLine from "./ProfileInfoLine";
import { IoLocationOutline, IoTimeOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { TbWorld } from "react-icons/tb";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";
import { getUsernameFromLink } from "@/functions/helpers";
import {
  DashboardProfile
} from "@/components/dashboard";
import useWindowWidth from "@/hooks/useWindowWidth";
import { useUserStore } from "@/state";
import { formatDate } from "@/functions/date";
import AvailableToggle from "./AvailableToggle";

/* eslint-disable @next/next/no-img-element */
export default function ProfileCard() {
  const vw = useWindowWidth();
  const user = useUserStore(s => s.user);
  const artisan = useUserStore(s => s.artisan);

  return (
    <div className="w-full border  gap-2 bg-light  p-4 rounded-md">
      {vw > 768 && <DashboardProfile />}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <p className="text-body font-semibold">General Info</p>
          {user?.createdAt && <ProfileInfoLine
          hideOnMobile
            title="Member Since"
            value={formatDate(user!.createdAt)}
            icon={<LuUser2 />}
          />}
          {artisan && <ProfileInfoLine
          hideOnMobile
            title="Location"
            value={`${artisan.state}, ${artisan.lga}`}
            icon={<IoLocationOutline />}
          />}
          <ProfileInfoLine
          hideOnMobile
            title="Email"
            value={user?.email}
            icon={<CiMail />}
          />
        </div>
        <hr />
        {
          user?.isArtisan &&
          <>
            <div className="flex flex-col gap-2">
              <p className="text-body font-semibold">Contact Info</p>
              {true && (
                <ProfileInfoLine
                hideOnMobile
                  title="Availability"
                  value={<AvailableToggle />}
                  icon={<IoTimeOutline />}
                />
              )}

              {artisan?.phoneNumber && (
                <ProfileInfoLine
                hideOnMobile
                  title="Phone Number"
                  value={artisan?.phoneNumber}
                  icon={<LuPhone />}
                />
              )}
              {artisan?.website && (
                <ProfileInfoLine
                hideOnMobile
                  title="Website"
                  value={
                    <a
                      className="link-btn text-body !font-normal"
                      href={artisan?.website}
                      target="_blank"
                    >
                      {artisan?.website}
                    </a>
                  }
                  icon={<TbWorld />}
                />
              )}
            </div>
            <hr />
            <div className="flex flex-col gap-2">
              <p className="text-body font-semibold">Social Links</p>
              {artisan?.instagram && (
                <ProfileInfoLine
                hideOnMobile
                  title="Instagram"
                  value={
                    <a
                      className="link-btn text-body !font-normal"
                      href={artisan?.instagram}
                      target="_blank"
                    >
                      {getUsernameFromLink(artisan?.instagram)}
                    </a>
                  }
                  icon={<FaInstagram />}
                />
              )}
              {artisan?.twitter && (
                <ProfileInfoLine
                hideOnMobile
                  title="x"
                  value={
                    <a
                      className="link-btn text-body !font-normal"
                      href={artisan?.twitter}
                      target="_blank"
                    >
                      {getUsernameFromLink(artisan?.twitter)}
                    </a>
                  }
                  icon={<FaXTwitter />}
                />
              )}
              {artisan?.facebook && (
                <ProfileInfoLine
                hideOnMobile
                  title="Facebook"
                  value={
                    <a
                      className="link-btn text-body !font-normal"
                      href={artisan?.facebook}
                      target="_blank"
                    >
                      {getUsernameFromLink(artisan?.facebook)}
                    </a>
                  }
                  icon={<FaFacebook />}
                />
              )}

              {artisan?.linkedin && (
                <ProfileInfoLine
                hideOnMobile
                  title="Linked In"
                  value={
                    <a
                      className="link-btn text-body !font-normal"
                      href={artisan?.linkedin}
                      target="_blank"
                    >
                      {getUsernameFromLink(artisan?.linkedin)}
                    </a>
                  }
                  icon={<FaLinkedin />}
                />
              )}
            </div>
          </>
        }
      </div>
    </div>
  );
}

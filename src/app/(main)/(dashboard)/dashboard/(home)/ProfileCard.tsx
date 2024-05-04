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
export type ProfileCardprops = {
  image: string;
  fullName: string;
  displayName: string;
  memberSince: string;
  location: string;
  email: string;
  availability?: string;
  phoneNumber?: string;
  website?: string;
  instagram?: string;
  facebook?: string;
  x?: string;
  linkedin?: string;
};
/* eslint-disable @next/next/no-img-element */
export default function ProfileCard(props: ProfileCardprops) {
  return (
    <div className="w-full border  gap-2 bg-light  p-4 rounded-md">
      <div className="flex flex-col gap-2 items-center py-4">
        <img
          src={props.image}
          alt=""
          className="rounded-full size-16 object-ccover"
        />
        <p className="font-semibold text-title">{props.fullName}</p>
        <p className="">{props.email}</p>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <p className="text-body font-semibold">General Info</p>
          <ProfileInfoLine
            title="Member Since"
            value={props.memberSince}
            icon={<LuUser2 />}
          />
          <ProfileInfoLine
            title="Location"
            value={props.location}
            icon={<IoLocationOutline />}
          />
          <ProfileInfoLine
            title="Location"
            value={props.email}
            icon={<CiMail />}
          />
        </div>
        <hr />
        <div className="flex flex-col gap-2">
          <p className="text-body font-semibold">Contact Info</p>
          {props.availability && (
            <ProfileInfoLine
              title="Availability"
              value={props.availability}
              icon={<IoTimeOutline />}
            />
          )}

          {props.phoneNumber && (
            <ProfileInfoLine
              title="Phone Number"
              value={props.phoneNumber}
              icon={<LuPhone />}
            />
          )}
          {props.website && (
            <ProfileInfoLine
              title="Website"
              value={
                <a
                  className="link-btn text-body !font-normal"
                  href={props.website}
                  target="_blank"
                >
                  {props.website}
                </a>
              }
              icon={<TbWorld />}
            />
          )}
        </div>
        <hr />
        <div className="flex flex-col gap-2">
          <p className="text-body font-semibold">Social Links</p>
          {props.instagram && (
            <ProfileInfoLine
              title="Instagram"
              value={
                <a
                  className="link-btn text-body !font-normal"
                  href={props.instagram}
                  target="_blank"
                >
                  {props.instagram}
                </a>
              }
              icon={<FaInstagram />}
            />
          )}
          {props.x && (
            <ProfileInfoLine
              title="x"
              value={
                <a
                  className="link-btn text-body !font-normal"
                  href={props.x}
                  target="_blank"
                >
                  {props.x}
                </a>
              }
              icon={<FaXTwitter />}
            />
          )}
          {props.facebook && (
            <ProfileInfoLine
              title="Facebook"
              value={
                <a
                  className="link-btn text-body !font-normal"
                  href={props.facebook}
                  target="_blank"
                >
                  {props.facebook}
                </a>
              }
              icon={<FaFacebook />}
            />
          )}

          {props.linkedin && (
            <ProfileInfoLine
              title="Linked In"
              value={
                <a
                  className="link-btn text-body !font-normal"
                  href={props.linkedin}
                  target="_blank"
                >
                  {props.linkedin}
                </a>
              }
              icon={<FaLinkedin />}
            />
          )}
        </div>
      </div>
    </div>
  );
}

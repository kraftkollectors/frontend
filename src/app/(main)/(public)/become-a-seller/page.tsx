/* eslint-disable @next/next/no-img-element */
import paths from "@/utils/paths";
import Link from "next/link";
import {
  FaClipboardUser,
  FaIdBadge,
  FaRegIdBadge,
  FaUser,
} from "react-icons/fa6";
import { MdPostAdd } from "react-icons/md";
import { staticMetadata } from "@/functions/metadata";
import { Metadata } from "next";

export const metadata:Metadata = staticMetadata({
  title: "KraftKollectors | Become a Seller",
  description: "Ready to start selling your services? KraftKollectors is your platform for connecting with clients"
})

export default function SellerPage() {
  return (
    <div className="flex flex-col-reverse md:flex-row gap-6 lg:gap-10 justify-center items-center app-container py-10 ">
      <div className=" flex flex-col gap-8 w-full md:w-1/2">
        <div className="">
          <p className="text-title font-bold">
            Ready to start selling on Kraftkollectors?
          </p>
          <p className="text-label">Here are they steps to be completed</p>
        </div>
        <div className="flex flex-col gap-7">
          <div className="flex flex-col">
            <div className="flex  items-center gap-4">
              <div className="bg-primary-lightActive2 rounded-full p-4 text-title text-primary relative">
                <FaUser />
                <div className="absolute h-20 border-dashed z-[-1] border-r-2 border-primary w-1 top-4 left-1/2 -translate-x-1/2"></div>
              </div>
              <div className="flex flex-col">
                <p className="font-semibold">Setup Your Profile</p>
                <p className="text-black-200">
                  Add your profile picture and other professional information
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex  items-center gap-4">
              <div className="bg-primary-lightActive2 rounded-full p-4 text-title text-primary relative">
                <FaRegIdBadge />
                <div className="absolute h-20 border-dashed z-[-1] border-r-2 border-primary w-1 top-4 left-1/2 -translate-x-1/2"></div>
              </div>
              <div className="flex flex-col">
                <p className="font-semibold">Setup Your Profile</p>
                <p className="text-black-200">
                  Add your profile picture and other professional information
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex  items-center gap-4">
              <div className="bg-primary-lightActive2 rounded-full p-4 text-primary text-title">
                <MdPostAdd />
              </div>
              <div className="flex flex-col">
                <p className="font-semibold">Setup Your Profile</p>
                <p className="text-black-200">
                  Add your profile picture and other professional information
                </p>
              </div>
            </div>
          </div>
        </div>
        <Link
          href={paths.becomeASellerPersonalDetails}
          className="btn-primary py-2 px-6 w-fit"
        >
          Get Started
        </Link>
      </div>
      <img
        src="/images/become-a-seller.png"
        alt="become a seller"
        className="w-full md:w-1/2"
      />
    </div>
  );
}

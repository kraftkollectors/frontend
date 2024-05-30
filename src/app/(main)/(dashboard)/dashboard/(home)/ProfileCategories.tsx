// 'use client'

import { FaRegEdit } from "react-icons/fa";
import ProfileCategory from "./ProfileCategory";
import Certificates from "./Certificates";
import Educations from "./Educations";
import { Suspense } from "react";

export type ProfileCategoriesProps = {
  description: string;
  awayMessage: string;
  education?: string;
};

export default function ProfileCategories({
  description,
  awayMessage,
  education,
}: ProfileCategoriesProps) {

  return (
    <div className=" flex flex-col p-4 rounded-md bg-light gap-2 border">
      <ProfileCategory
        title="Description"
        action={
          <button className="edit-btn">
            <FaRegEdit /> Edit
          </button>
        }
      >
        <p className="text-black-400">{description}</p>
      </ProfileCategory>
      <ProfileCategory
        title="Away Message"
        action={
          <button className="edit-btn">
            <FaRegEdit /> Edit
          </button>
        }
      >
        <p className="text-black-400">{awayMessage}</p>
      </ProfileCategory>

      <Suspense fallback={<div className="skeleton w-full h-20"></div>}><Educations /></Suspense>
      <Suspense fallback={<div className="skeleton w-full h-20"></div>}><Certificates /></Suspense>
    </div>
  );
}

import { FaRegEdit } from "react-icons/fa";
import ProfileCategory from "./ProfileCategory";
import { FaPlus } from "react-icons/fa6";
import { EducationCard } from "@/components/education/EducationCard";
import { CertificateCard } from "@/components/certificate/CertificateCard";
import Certificates from "./Certificates";

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

      <ProfileCategory
        title="Education"
        action={
          <button className="edit-btn">
            <FaPlus /> Add New
          </button>
        }
      >
        <EducationCard
          universityName="University of Technology Owerri"
          degree="Bachelor of Engineering(BEng)"
          areaOfStudy=""
          graduation="2023"
          id=""
          onDelete={() => {}}
          onEdit={() => {}}
        />
      </ProfileCategory>

      <Certificates />
    </div>
  );
}

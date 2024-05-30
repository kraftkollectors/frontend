'use client'

import { EducationCard } from "@/components/education/EducationCard";
import { FaPlus } from "react-icons/fa6";
import ProfileCategory from "./ProfileCategory";

export default function Educations() {
    return (
        <div>
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
        </div>
    );
}
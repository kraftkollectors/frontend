import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import EducationModal from "./EducationModal";

export type Education = {
  universityName: string;
  degree: string;
  areaOfStudy: string;
  graduation: string;
  id: string;
};
export type EducationCardProps = Education & {
  onDelete: (id: string) => void;
  onEdit: (data: Education) => void;
};

export function EducationCard({
  universityName,
  degree,
  areaOfStudy,
  graduation,
  onDelete,
  onEdit,
  id,
}: EducationCardProps) {
  return (
    <div className="bg-white p-3 flex flex-col gap-1.5 border rounded border-black-50">
      <div className="flex justify-between">
        <p>{universityName} </p>
        <EducationModal
          data={{ universityName, degree, areaOfStudy, graduation, id }}
          onSubmit={(data) => {
            onEdit(data);
          }}
          isNew={false}
        >
          <button className="edit-btn">
            <span>Edit</span> <FaRegEdit />
          </button>
        </EducationModal>
      </div>
      <div className="flex justify-between">
        <p className="text-label font-[500] text-black-300">{degree} </p>
        <button onClick={() => onDelete(id)} className="delete-btn">
          <span>Delete</span> <RiDeleteBin6Line />
        </button>
      </div>
      <p className="text-label font-[500] text-black-300">
        Year of Graduation {graduation}
      </p>
    </div>
  );
}

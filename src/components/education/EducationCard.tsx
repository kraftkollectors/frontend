'use client'

import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import EducationModal from "./EducationModal";
import { Education as MainEducation } from "@/utils/types/education";
import { FormButton } from "../ui/FormButton";
import { useFormState } from "react-dom";
import { deleteEducation } from "@/actions";
import { useEffect } from "react";
import UserAuth from "../server/UserAuth";
import { toast } from "react-toastify";
import AppToast from "../Toast";

export type Education = MainEducation;
export function EducationCard({
  university: universityName,
  degree,
  areaOfStudy,
  year: graduation,
  _id: id,
}: Education) {
  const [deleteRes, deleteAction] = useFormState(deleteEducation, {});
  useEffect(()=>{
    if(deleteRes.success){
      toast(<AppToast.success message={deleteRes.success} />)
    }else if(deleteRes.error) toast(<AppToast.error message={deleteRes.error} />)
  }, [deleteRes])

  return (
    <div className="bg-white p-3 flex flex-col gap-1.5 border rounded border-black-50">
      <div className="flex justify-between">
        <p>{universityName} </p>
        <EducationModal
          data={{ university: universityName, degree, areaOfStudy, year: graduation, _id: id }}
          isNew={false}
        >
          <button className="edit-btn">
            <span>Edit</span> <FaRegEdit />
          </button>
        </EducationModal>
      </div>
      <div className="flex justify-between">
        <p className="text-label font-[500] text-black-300">{degree} </p>
        <form action={deleteAction}>
          <input type="hidden" hidden name="_id" value={id} />
          <UserAuth />
          <FormButton className="delete-btn">
            <span>Delete</span> <RiDeleteBin6Line />
          </FormButton>
        </form>
      </div>
      <p className="text-label font-[500] text-black-300">
        Year of Graduation {graduation}
      </p>
    </div>
  );
}

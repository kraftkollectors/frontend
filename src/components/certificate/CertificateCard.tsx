'use client'

import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import CertificateModal from "./CertificateModal";
import { Certificate as MainCertificate } from "@/utils/types/certificate";
import { deleteCertificate } from "@/actions";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import AppToast from "../Toast";
import UserAuth from "../server/UserAuth";
import { FormButton } from "../ui/FormButton";

export type Certificate = MainCertificate;
export type CertificateCardProps = Certificate 

export function CertificateCard({
  certificate,
  certifiedBy,
  year,
   _id,
}: CertificateCardProps) {
    const [deleteRes, deleteAction] = useFormState(deleteCertificate, {});
  useEffect(()=>{
    if(deleteRes.success){
      toast(<AppToast.success message={deleteRes.success} />)
    }else if(deleteRes.error) toast(<AppToast.error message={deleteRes.error} />)
  }, [deleteRes])
  return (
    <div className="bg-white p-3 flex flex-col gap-2 border rounded border-black-50">
      <div className="flex justify-between">
        <p>{certificate} </p>
        <CertificateModal
          data={{ certificate, certifiedBy, year,  _id }}
        
          isNew={false}
        >
          <button className="edit-btn">
            <span>Edit</span> <FaRegEdit />
          </button>
        </CertificateModal>
      </div>
      <div className="flex justify-between">
        <p>{certifiedBy} </p>
        <form action={deleteAction}>
          <input type="hidden" hidden name="_id" value={_id} />
          <UserAuth />
          <FormButton className="delete-btn">
            <span>Delete</span> <RiDeleteBin6Line />
          </FormButton>
        </form>
      </div>
      <p>Year of Graduation {year}</p>
    </div>
  );
}

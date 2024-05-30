'use client'

import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import CertificateModal from "./CertificateModal";
import { Certificate as MainCertificate } from "@/utils/types/certificate";

export type Certificate = MainCertificate;
export type CertificateCardProps = Certificate 

export function CertificateCard({
  certificate,
  certifiedBy,
  year,
   _id,
}: CertificateCardProps) {
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
        <button className="delete-btn">
          <span>Delete</span> <RiDeleteBin6Line />
        </button>
      </div>
      <p>Year of Graduation {year}</p>
    </div>
  );
}

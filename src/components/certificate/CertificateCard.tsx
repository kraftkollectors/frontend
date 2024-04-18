import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import CertificateModal from "./CertificateModal";

export type Certificate = {
  id: string;
  certificate: string;
  certifiedBy: string;
  year: string;
};
export type CertificateCardProps = Certificate & {
  onDelete: (id: string) => void;
  onEdit: (data: Certificate) => void;
};

export function CertificateCard({
  certificate,
  certifiedBy,
  year,
  onDelete,
  onEdit,
  id,
}: CertificateCardProps) {
  return (
    <div className="bg-white p-3 flex flex-col gap-2 border rounded border-black-50">
      <div className="flex justify-between">
        <p>{certificate} </p>
        <CertificateModal
          data={{ certificate, certifiedBy, year, id }}
          onSubmit={(data) => {
            onEdit(data);
          }}
          isNew={false}
        >
          <button className="edit-btn">
            <span>Edit</span> <FaRegEdit />
          </button>
        </CertificateModal>
      </div>
      <div className="flex justify-between">
        <p>{certifiedBy} </p>
        <button onClick={() => onDelete(id)} className="delete-btn">
          <span>Delete</span> <RiDeleteBin6Line />
        </button>
      </div>
      <p>Year of Graduation {year}</p>
    </div>
  );
}

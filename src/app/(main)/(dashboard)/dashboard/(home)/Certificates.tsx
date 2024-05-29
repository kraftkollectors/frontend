import { CertificateCard } from "@/components/certificate/CertificateCard";
import { FaPlus } from "react-icons/fa6";
import ProfileCategory from "./ProfileCategory";
import CertificateModal from "@/components/certificate/CertificateModal";
import { CertificatesAction } from "@/components/dashboard";

export default async function Certificates() {
    return (
        <ProfileCategory
        title="Certificates"
        action={
          <CertificatesAction />
        }
      >
        <CertificateCard
          id=""
          year="2022"
          certificate="Web Development with Python"
          certifiedBy="Aptech Institute"
          onDelete={() => {}}
          onEdit={() => {}}
        />
      </ProfileCategory>
    );
}
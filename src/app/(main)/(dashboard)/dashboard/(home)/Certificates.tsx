'use client'

import { CertificateCard } from "@/components/certificate/CertificateCard";
import { FaPlus } from "react-icons/fa6";
import ProfileCategory from "./ProfileCategory";
import { CertificatesAction } from "@/components/dashboard";

export default function Certificates() {
    return (
        <ProfileCategory
        title="Certificates"
        action={
          <CertificatesAction />
        }
      >
        <CertificateCard
          _id=""
          year="2022"
          certificate="Web Development with Python"
          certifiedBy="Aptech Institute"
          onDelete={() => {}}
          onEdit={() => {}}
        />
      </ProfileCategory>
    );
}
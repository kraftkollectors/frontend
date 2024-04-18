"use client";
import { useState } from "react";
import { CertificateCard, Certificate } from "./CertificateCard";

import { FaPlus } from "react-icons/fa6";
import CertificateModal from "./CertificateModal";

export function CertificationSelector() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  return (
    <div className="flex flex-col gap-2">
      {certificates.map((item) => (
        <CertificateCard
          onDelete={(id) => {
            setCertificates(certificates.filter((item) => item.id !== id));
          }}
          key={item.id}
          {...item}
          onEdit={(data) => {
            setCertificates(
              certificates.map((item) => {
                if (item.id === data.id) {
                  return data;
                }
                return item;
              })
            );
          }}
        />
      ))}
      <CertificateModal
        onSubmit={(data) => {
          console.log(data);
          setCertificates([...certificates, data]);
        }}
      >
        <button className="btn-transparent w-fit px-4">
          add new <FaPlus className="text-small" />
        </button>
      </CertificateModal>
    </div>
  );
}

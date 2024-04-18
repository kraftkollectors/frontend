"use client";
import { useState } from "react";

import { FaPlus } from "react-icons/fa6";
import EducationModal from "./EducationModal";
import { Education, EducationCard } from "./EducationCard";

export function EducationSelector() {
  const [certificates, setCertificates] = useState<Education[]>([]);

  return (
    <div className="flex flex-col gap-2">
      {certificates.map((item) => (
        <EducationCard
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
      <EducationModal
        onSubmit={(data) => {
          console.log(data);
          setCertificates([...certificates, data]);
        }}
      >
        <button className="btn-transparent w-fit px-4">
          add new <FaPlus className="text-small" />
        </button>
      </EducationModal>
    </div>
  );
}

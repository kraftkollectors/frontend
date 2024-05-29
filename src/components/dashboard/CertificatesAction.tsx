'use client'

import { FaPlus } from "react-icons/fa6";
import CertificateModal from "../certificate/CertificateModal";
import { Certificate } from "../certificate/CertificateCard";

export default function CertificatesAction() {

    async function handleSubmit(data:Certificate) {
        
    }
    
    return (
        <CertificateModal>
            <button className="edit-btn">
                <FaPlus /> Add New
            </button>
        </CertificateModal>
    );
}
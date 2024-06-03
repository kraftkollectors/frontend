
import { EducationCard } from "@/components/education/EducationCard";
import { FaPlus } from "react-icons/fa6";
import ProfileCategory from "./ProfileCategory";
import { fetchUserEducations } from "@/actions";
import EducationModal from "@/components/education/EducationModal";
import { debugLog } from "@/functions/helpers";

export default async function Educations() {
    const education = await fetchUserEducations({ throwsError: false });
    if(!education) return <></>
    if (education == 'error') return <div className="info-box">failed to get Education</div>


    return (
        <div>
            <ProfileCategory
                title="Education"
                action={
                    <EducationModal>
                        <button className="edit-btn">
                            <FaPlus /> Add New
                        </button>
                    </EducationModal>
                }
            >
                {
                    education.length == 0 ? <div className="info-box">Nothing yet</div> :
                    education.map(edu =>
                        <EducationCard
                            key={edu._id}
                            {...edu}
                        />
                    )
                }
            </ProfileCategory>
        </div>
    );
}
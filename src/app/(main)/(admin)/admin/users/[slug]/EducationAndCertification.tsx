import { fetchUserCertificates, fetchUserEducations } from "@/actions";
import { ListGroup } from "@/components/admin";
import ListTile from "@/components/admin/ListTile";
import AppIcons from "@/components/AppIcons";
import { Certificate } from "@/utils/types/certificate";
import { Education } from "@/utils/types/education";

export default async function EducationAndCertification({userId}:{userId:string}) {
    const education = await fetchUserEducations({throwsError: false, params: userId, isPublic: true});
    if(!education || education == 'error') return null;
    const certificates = await fetchUserCertificates({throwsError: false, params: userId, isPublic: true});
    if(!certificates || certificates == 'error') return null;


    return (
        <ListGroup
            title="Education & Certification"
            className="col-span-1"
        >
            {
                [...education, ...certificates].map(item => <Card key={item._id} item={item} />)
            }
        </ListGroup>
    );
}


function Card({ item }: { item: Education | Certificate }) {
    if ((item as Education).university) {
        const i = item as Education;
        return (
            <div className="flex justify-stretch items-start gap-3 py-1" >
                <AppIcons.RoundEducation />
                <div>
                    <h3 className="font-bold text-black-400 text-label line-clamp-1">{i.areaOfStudy}</h3>
                    <h4 className="font-semibold text-black-300 text-label line-clamp-1">{i.university}</h4>
                    <p className="font-semibold text-black-300 text-label line-clamp-1">year of completion {i.year}</p>
                </div>
            </div>
        )
    }
    else {
        const i = item as Certificate;
        return (
            <div className="flex justify-stretch items-start gap-3 py-1" >
                <AppIcons.RoundEducation />
                <div>
                    <h3 className="font-bold text-black-400 text-label line-clamp-1">{i.certificate}</h3>
                    <h4 className="font-semibold text-black-300 text-label line-clamp-1">{i.certifiedBy}</h4>
                    <p className="font-semibold text-black-300 text-label line-clamp-1">year of graduation {i.year}</p>
                </div>
            </div>
        )
    }
}
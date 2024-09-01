import { fetchUserCertificates } from "@/actions";

export default async function Certificates({userId}:{userId: string}) {
    const certifications = await fetchUserCertificates({ throwsError: false, isPublic: true, params: userId });
    if(!certifications) return <></>
    if (certifications == 'error') return <div className="info-box">failed to get Certificates</div>

    
    return (
        <div className="flex flex-col gap-1 pb-2 border-b">
        <h1 className="font-bold ">Certifications</h1>
        {certifications.map(({ certificate, certifiedBy, year }, i) => (
          <div key={i} className="pb-1 flex flex-col gap-1">
            <p className="text-black-900">{certificate}</p>
            <p className="text-black-300 font-semibold text-sm">
              {certifiedBy}
            </p>
            <p className="text-black-300 font-semibold text-sm">
              Year of graduation {year}
            </p>
          </div>
        ))}
      </div>
    );
}
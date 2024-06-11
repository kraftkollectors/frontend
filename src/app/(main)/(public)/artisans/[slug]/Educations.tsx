import { fetchUserEducations } from "@/actions";

export default async function Educations({userId}:{userId: string}) {
    const education = await fetchUserEducations({ throwsError: false, isPublic: true, params: userId });
    if(!education) return <></>
    if (education == 'error') return <div className="info-box">failed to get Education</div>

    
    return (
        <div className="flex flex-col gap-1 pb-2 border-b">
        <h1 className="font-bold ">Education</h1>
        {education.map(({ degree, university: universityName, year: graduation }, i) => (
          <div key={i} className="pb-1 flex flex-col gap-1">
            <p className="text-black-900">{universityName}</p>
            <p className="text-black-300 font-semibold text-sm">{degree}</p>
            <p className="text-black-300 font-semibold text-sm">
              Year of graduation {graduation}
            </p>
          </div>
        ))}
      </div>
    );
}
import { fetchSingleArtisanService } from "@/actions";

/* eslint-disable @next/next/no-img-element */
export default async function ReviewServiceCard({serviceId}:{serviceId:string}) {
    const service = await fetchSingleArtisanService(serviceId, {throwsError: false, isPublic: true});
    if(!service || service == 'error') return <></>
    
    return (
        <div className="flex gap-2 items-center">
          <img
            src={service.coverPhoto}
            alt={service.title}
            className="w-4/12 object-cover aspect-[5/3] rounded"
          />
          <div className="flex flex-col gap-1">
            <h1 className="text-black-300">Reviewed</h1>
            <h2>{service.title}</h2>
            <p className="font-bold">
              N{service.estimatedPrice} / {service.charge}
            </p>
          </div>
        </div>
    );
}
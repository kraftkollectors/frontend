import { fetchSingleArtisanService } from "@/actions";
import { paths } from "@/utils";
import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
export default async function ReviewServiceCard({serviceId}:{serviceId:string}) {
    const service = await fetchSingleArtisanService(serviceId, {throwsError: false, isPublic: true});
    if(!service || service == 'error') return <></>
    
    return (
        <Link href={paths.service(serviceId)}>
        <div className="flex gap-2 items-center">
          <img
            src={service.coverPhoto}
            alt={service.title}
            className="w-4/12 object-cover aspect-[5/3] rounded"
          />
          <div className="flex flex-col gap-1">
            <h1 className="text-black-300">Reviewed</h1>
            <h2 className="line-clamp-2">{service.title}</h2>
            <p className="font-bold">
              N{service.estimatedPrice} / {service.charge}
            </p>
          </div>
        </div>
        </Link>
    );
}
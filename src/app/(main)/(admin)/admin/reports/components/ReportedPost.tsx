/* eslint-disable @next/next/no-img-element */
import { fetchSingleService, fetchUser } from "@/actions";
import AppIcons from "@/components/AppIcons";
import { fullName } from "@/functions/helpers";
import { paths } from "@/utils";
import { Service } from "@/utils/types/service";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect } from "react";

export default function ReportedPost({postId}:{postId: string}) {
    const { data, isLoading, error } = useQuery({
        queryKey: ['fetch_service', postId],
        queryFn: () => fetchSingleService(postId, { isPublic: true, throwsError: false })
    })

    const { data: userData, isLoading: userLoading, error: userError, refetch } = useQuery({
        queryKey: ['fetch_user', postId],
        queryFn: () => fetchUser({ isPublic: true, throwsError: false, params: (data as Service).userId }),
        refetchOnMount: false,
    })

    useEffect(()=>{
        if(!data || data === 'error') return;
        refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])


    return (
        isLoading ? <div className="info-box">Loading Service...</div>
            : error || !data || data === 'error' ? <div className="info-box">Failed to load service</div>
                : <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
                    <img src={data.coverPhoto} alt="cover photo for service"
                        className="rounded-md max-md:w-10/12 md:col-span-2 bg-black-50 overflow-hidden aspect-[4/3] object-cover" />
                    <div className="flex flex-col gap-2 md:col-span-3">
                        <h2 className="text-black-500">
                            {!userLoading && !userError && userData && userData !== 'error' && fullName(userData.firstName, userData.lastName)}
                        </h2>
                        <h3 className="text-black-400 line-clamp-2">{data.title}</h3>
                        <p className="text-black-300">{data.category} | {data.subCategory} </p>
                        <Link href={paths.service(data._id)}
                            target="_blank"
                            className="inline-flex items-center gap-1 text-primary">
                            View details
                            <AppIcons.ExternalLink />
                        </Link>
                    </div>
                </div>
    )
}
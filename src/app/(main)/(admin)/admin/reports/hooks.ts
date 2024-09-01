/* eslint-disable react-hooks/exhaustive-deps */
import { revalidateTags } from "@/actions";
import { deleteContactOrReport, markContactOrReportResolved } from "@/actions/admin";
import AppToast from "@/components/Toast";
import { apis, tags } from "@/utils";
import { Report } from "@/utils/types/reports";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

export function useFetchReport(reportId: string|null) {
    return useQuery({
        queryKey: ['fetchReport', reportId],
        queryFn: async () => reportId && fetch(apis.singleReport(reportId))
            .then(res => res.json()
                .then(async (data) => {
                    await revalidateTags([tags.reports])
                    return data.data.existingRecords
                })) as Promise<Report>,
    })
}

export function useMarkReportResolved(resolved:boolean){
    const [isResolved, setIsResolved] = useState(resolved)
    const [res, action] = useFormState(markContactOrReportResolved, {});

    useEffect(()=>{
        setIsResolved(resolved);
    }, [resolved])

    useEffect(()=>{
        if(res.error){
            toast(AppToast.error({message: res.error}))
        }else if(res.success){
            setIsResolved(true);
            toast(AppToast.success({message: 'Resolved report'}))
        }
    }, [res])
    
    return {resolveAction: action, isResolved};
}

export function useDeleteReport(onDeleted?: ()=>void){
    const [res, action] = useFormState(deleteContactOrReport, {});

    useEffect(()=>{
        if(res.error){
            toast(AppToast.error({message: res.error}))
        }else if(res.success){
            if(onDeleted) onDeleted();
            toast(AppToast.success({message: 'Deleted report'}))
        }
    }, [res])
    
    return action;
}
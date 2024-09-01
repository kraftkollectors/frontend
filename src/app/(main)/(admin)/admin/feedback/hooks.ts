/* eslint-disable react-hooks/exhaustive-deps */
import { revalidateTags } from "@/actions";
import { deleteContactOrReport, markContactOrReportResolved } from "@/actions/admin";
import AppToast from "@/components/Toast";
import { apis, tags } from "@/utils";
import { ContactMessage } from "@/utils/types/contact";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

export function useFetchContactMessage(feedbackId: string|null) {
    return useQuery({
        queryKey: ['fetchContactMessage', feedbackId],
        queryFn: async () => feedbackId && fetch(apis.singleFeedback(feedbackId))
            .then(res => res.json()
                .then(async (data) => {
                    await revalidateTags([tags.feedbacks])
                    return data.data.existingRecords
                })) as Promise<ContactMessage>,
    })
}

export function useMarkFeedbackResolved(resolved:boolean){
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
            toast(AppToast.success({message: 'Resolved feedback'}))
        }
    }, [res])
    
    return {resolveAction: action, isResolved};
}

export function useDeleteFeedback(onDeleted?: ()=>void){
    const [res, action] = useFormState(deleteContactOrReport, {});

    useEffect(()=>{
        if(res.error){
            toast(AppToast.error({message: res.error}))
        }else if(res.success){
            if(onDeleted)onDeleted();
            toast(AppToast.success({message: 'Deleted feedback'}))
        }
    }, [res])
    
    return action;
}
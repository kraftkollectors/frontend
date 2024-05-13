'use client'

import { ActionResponse } from "@/utils/types/basicTypes";
import { useFormStatus } from "react-dom";

export type FormMessageProps = {
    res: ActionResponse;
}

export function FormMessage({
    res: {error, success}
}: FormMessageProps) {
    const {pending} = useFormStatus();
    
    if(!pending)
    return (
        <>
        {
            error && <p className="text-red-900 bg-red-50 border-red-800 p-2 rounded-md">{error}</p>
        }
        {
            success && <p className="text-green-900 bg-green-50 border-green-800 p-2 rounded-md">{success}</p>
        }
        </>
    );
}
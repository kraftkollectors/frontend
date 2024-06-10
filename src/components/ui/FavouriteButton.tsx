'use client'

import { checkFavourite, toggleFavourite } from "@/actions";
import { debugLog } from "@/functions/helpers";
import { useUserStore } from "@/state";
import { HTMLAttributes, useEffect, useLayoutEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6"
import { FormButton } from "./FormButton";
import { useFormState } from "react-dom";
import UserAuth from "../server/UserAuth";
import { toast } from "react-toastify";
import AppToast from "../Toast";

export type FavouriteButtonProps = HTMLAttributes<HTMLButtonElement> & {
    serviceId:string;
}
export function FavouriteButton({serviceId, className, ...props}:FavouriteButtonProps) {
    const user = useUserStore(s=>s.user);
    const [isFav, setIsFav] = useState<boolean|null>(false);
    const [res, action] = useFormState(toggleFavourite, {})
    
    useEffect(()=>{
        debugLog(`effect ${user?._id} ${serviceId}`)
        async function check() {
            if(!user?._id) return;
            const req = await checkFavourite({serviceId, userId:user._id})
            setIsFav(req);
        }

        check();
    }, [user?._id, serviceId])
    
    useLayoutEffect(()=>{
        if(res.success) setIsFav(res.data);
        else if(res.error) toast(<AppToast.error message={res.error} />)
    }, [res])
    
    return <form action={action}>
        <FormButton
        {...props}
         className={`size-8 rounded-md shadow inline-flex items-center justify-center bg-light ${className}`}>
            {
                isFav ? <FaHeart className="text-red-600" /> : <FaRegHeart />
            }
        </FormButton>
            <UserAuth />
            <input type="hidden" name="serviceId" defaultValue={serviceId} />
            <input type="hidden" name="delete" defaultValue={`${isFav}`} />
    </form>
}
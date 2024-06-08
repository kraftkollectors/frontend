'use client'

import { HTMLAttributes, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6"

export type FavouriteButtonProps = HTMLAttributes<HTMLButtonElement> & {
    isFavourite?:boolean;
}
export function FavouriteButton({isFavourite = false, className, ...props}:FavouriteButtonProps) {
    const [isFav, setIsFav] = useState(isFavourite);
    
    function toggleFav(){
        setIsFav(!isFav);
    }
    
    return <>
        <button
        {...props}
         onClick={toggleFav}
         className={`size-8 rounded-md shadow inline-flex items-center justify-center bg-light ${className}`}>
            {
                isFav ? <FaHeart className="text-red-600" /> : <FaRegHeart />
            }
        </button>
    </>
}
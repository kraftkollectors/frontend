'use client'

import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6"

export type FavouriteButtonProps = {
    isFavourite?:boolean;
}
export function FavouriteButton({isFavourite = false}:FavouriteButtonProps) {
    const [isFav, setIsFav] = useState(isFavourite);
    
    function toggleFav(){
        setIsFav(!isFav);
    }
    
    return <>
        <button
         onClick={toggleFav}
         className="size-8 rounded-md shadow inline-flex items-center justify-center bg-light">
            {
                isFav ? <FaHeart className="text-red-600" /> : <FaRegHeart />
            }
        </button>
    </>
}
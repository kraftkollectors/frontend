'use client'

import AppInput from "../ui/AppInput";
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Libraries, useLoadScript } from '@react-google-maps/api';
import { toast } from "react-toastify";
import AppToast from "../Toast";
import { debugLog } from "@/functions/helpers";
import { useEffect, useRef, useState } from "react";
import { useGoogleLocationInput } from "@/hooks";

export type GoogleLocation = {
    address: string;
    longitude: number;
    latitude: number;
}
export type GoogleLocationInputProps = {
    onChange: (location?:GoogleLocation)=>void;
    value?: GoogleLocation;
}
export default function GoogleLocationInput({onChange, value:v}:GoogleLocationInputProps) {
    const {setValue, handleSelect, data, isValid, value, setIsValid} = useGoogleLocationInput(onChange, v);

    // ${isValid ? '!border-green-500' : '!border-red-500'}
    return (
        <div className={`relative [&.AppInput]:relative [&.AppInput]:z-[1] border-2 border-transparent rounded-lg
        `}>
            <AppInput
                onChange={(v) => {
                    setIsValid(false);
                    setValue(v)
                }}
                value={value}
                name="" type="text" placeholder="Enter and select a location" />
                {!isValid && <span className="text-red-800 text-sm leading-[9px]">Invalid address, you must select one from the dropdown or use current location</span>}
            {
                data && data.length > 0 &&
                <div className="absolute z-[0] w-full top-full shadow-[0_-2px_10px_#00000044] rounded-b left-0 p-2 max-h-[200px] overflow-y-auto flex flex-col bg-light divide-y">
                    {status == 'OK' && data.map(item => (
                        <button
                            className="py-1 text-start font-semibold text-label text-black-400"
                            onClick={() => handleSelect(item.description)} key={item.place_id}>
                            {item.description}
                        </button>
                    ))}
                </div>}
        </div>
    );
}

"use client";

import AppInput from "../ui/AppInput";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { Libraries, useLoadScript } from "@react-google-maps/api";
import { toast } from "react-toastify";
import AppToast from "../Toast";
import { debugLog } from "@/functions/helpers";
import { useEffect, useRef, useState } from "react";
import { useGoogleLocationInput } from "@/hooks";

export type GoogleLocation = {
  address: string;
  longitude: number;
  latitude: number;
};
export type GoogleLocationInputProps = {
  onChange: (location?: GoogleLocation) => void;
  value?: GoogleLocation;
};
export default function GoogleLocationInput({
  onChange,
  value: v,
}: GoogleLocationInputProps) {
  const { setValue, handleSelect, data, isValid, value, setIsValid } =
    useGoogleLocationInput(onChange, v);

  // ${isValid ? '!border-green-500' : '!border-red-500'}
  return (
    <div
      className={`relative rounded-lg border-2 border-transparent [&.AppInput]:relative [&.AppInput]:z-[1]`}
    >
      <AppInput
        onChange={(v) => {
          setIsValid(false);
          setValue(v);
        }}
        value={value}
        name=""
        type="text"
        placeholder="Enter and select a location"
      />
      {!isValid && (
        <span className="text-[12px] leading-[7px] text-red-800">
          Invalid address, you must select one from the dropdown or use current
          location
        </span>
      )}
      {data && data.length > 0 && (
        <div className="location-popover z-10">
          {data.map((item) => (
            <button
              className="btn-location"
              onClick={() => handleSelect(item.description)}
              key={item.place_id}
            >
              {item.description}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

'use client'

import { getDeviceLocation } from "@/functions/getDeviceLocation";
import { MdMyLocation } from "react-icons/md";
import { toast } from "react-toastify";
import AppToast from "../Toast";
import { GoogleLocation } from "../maps/GoogleLocationInput";
import { Location } from "@/utils/types/location";

export type UseCurrentLocationProps = {
  onChange: (location?:GoogleLocation)=>void
}

export function locationToGoogleLocation({address, latitude, longitude}: Location & {address: string}):GoogleLocation{
  return {
    address, 
    latitude: Number(latitude),
    longitude: Number(longitude),
  }
}

export function UseCurrentLocation({onChange}:UseCurrentLocationProps) {
  async function getLocation(){
    const location = await getDeviceLocation();
    if(!location) {
      toast(<AppToast.error message="Failed to get location" />);
      return;
    }else{
      onChange(locationToGoogleLocation(location))
    }
  } 
  
  return (
    <>
    <button role="button" type="button" onClick={getLocation}  className="text-primary hover:text-primary-dark flex items-center gap-2">
      <MdMyLocation />
      <span>Use Current location</span>
    </button>
    </>
  );
}

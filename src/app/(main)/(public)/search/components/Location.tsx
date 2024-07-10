'use client'

import { UseCurrentLocation } from "@/components";
import GoogleLocationInput from "@/components/maps/GoogleLocationInput";
import AppSelect from "@/components/ui/AppSelect";
import { useChangeSearchParams, useLocation } from "@/hooks";
import { useMemo } from "react";

export default function Location() {

  const { params } = useChangeSearchParams();
  const lng = useMemo(() => Number(params.get('longitude')), [params]);
  const lat = useMemo(() => Number(params.get('latitude')), [params]);
  const address = useMemo(() => params.get('address'), [params]);

  const { location: loc, setLocation: setLoc, isLoaded } = useLocation((!lat || !lng || !address) ? undefined : {
    latitude: lat,
    longitude: lng,
    address
  })

  return (
    <div className="flex flex-col gap-2">
      {isLoaded && <GoogleLocationInput onChange={setLoc} value={loc} />}
      <input type="hidden" name="address" value={loc?.address ?? ''} />
      <input type="hidden" name="latitude" value={loc?.latitude ?? ''} />
      <input type="hidden" name="longitude" value={loc?.longitude ?? ''} />
      <UseCurrentLocation onChange={setLoc} />
      <AppSelect name="radius" options={radius} value={params.get('radius') ?? radius[0].value} />
    </div>
  );
}

const radius = [
  {
    title: "All",
    value: "1000000"
  },
  {
    title: "2km",
    value: "2"
  },
  {
    title: "10km",
    value: "10"
  },
  {
    title: "30km",
    value: "30"
  },
]
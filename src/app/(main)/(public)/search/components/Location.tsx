'use client'

import AppSelect from "@/components/ui/AppSelect";
import { useChangeSearchParams } from "@/hooks";
import { useMemo } from "react";

export default function Location() {

  const { params } = useChangeSearchParams();
  const lng = useMemo(() => Number(params.get('longitude')), [params]);
  const lat = useMemo(() => Number(params.get('latitude')), [params]);
  const address = useMemo(() => params.get('address'), [params]);

  return (
    <div className="flex flex-col gap-2">
      <input type="hidden" name="address" value={address ?? ''} />
      <input type="hidden" name="latitude" value={lat ?? ''} />
      <input type="hidden" name="longitude" value={lng ?? ''} />
      <AppSelect name="radius" options={radius} value={params.get('radius') ?? radius[0].value} />
    </div>
  );
}

const radius = [
  {
    title: "All",
    value: "10000000000000"
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
import { UseCurrentLocation } from "@/components";
import AppInput from "@/components/ui/AppInput";
import AppSelect from "@/components/ui/AppSelect";
import { useChangeSearchParams } from "@/hooks";

export default function Location() {
  const {params} = useChangeSearchParams();
  
  return (
    <div className="flex flex-col gap-2">
      <AppInput name="location" placeholder="Enter Location" value={params.get('location') || undefined} />
      <UseCurrentLocation />
      <AppSelect name="radius" options={radius} value={params.get('radius') ?? radius[0].value} />
    </div>
  );
}

const radius = [
  {
    title: "all",
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
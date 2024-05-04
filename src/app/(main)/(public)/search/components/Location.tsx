import { UseCurrentLocation } from "@/components";
import AppInput from "@/components/ui/AppInput";
import AppSelect from "@/components/ui/AppSelect";

export default function Location() {
  return (
    <div className="flex flex-col gap-2">
      <AppInput name="location" placeholder="Enter Location" />
      <UseCurrentLocation />
      <AppSelect name="radius" options={["radius"]} />
    </div>
  );
}

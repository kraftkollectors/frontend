import AppInput from "@/components/ui/AppInput";
import AppSelect from "@/components/ui/AppSelect";

export default function Category() {
  return (
    <div className="flex flex-col gap-2">
      <AppSelect name="category" title="Category" options={["category"]} />
      <AppSelect name="subcategory" title="Sub-Category" options={["radius"]} />
    </div>
  );
}

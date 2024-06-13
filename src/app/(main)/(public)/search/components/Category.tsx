import AppSelect from "@/components/ui/AppSelect";

export default function Category() {
  return (
    <div className="flex flex-col gap-2">
      <AppSelect name="category" title="Category" options={["category"]} />
      <AppSelect name="subCategory" title="Sub-Category" options={["radius"]} />
    </div>
  );
}

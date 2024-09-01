import AppSelect from "@/components/ui/AppSelect";

export default function Filters() {
    return (
        <div className="flex gap-3 [&_select]:!py-1.5">
        <AppSelect name="filter" options={["All Status"]} />
        <AppSelect name="new" options={['All plan']} />
      </div>
    );
}
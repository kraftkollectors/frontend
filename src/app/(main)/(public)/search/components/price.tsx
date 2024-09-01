import AppInput from "@/components/ui/AppInput";
import { useChangeSearchParams } from "@/hooks";
import { useState } from "react";

export default function Price() {
  const { params } = useChangeSearchParams();

  const [price, setPrice] = useState<[number, number]>([
    Number(params.get("minPrice")) ?? "",
    Number(params.get("maxPrice")) ?? "",
  ]);

  return (
    <div className="flex min-w-72 flex-col gap-2">
      <div className="grid grid-cols-2 gap-2 py-2">
        <AppInput
          type="number"
          name="minPrice"
          placeholder="Min Price"
          value={price[0].toString()}
        />
        <AppInput
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          value={price[1].toString()}
        />
      </div>
    </div>
  );
}

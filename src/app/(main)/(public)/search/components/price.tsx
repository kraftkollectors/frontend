import AppInput from "@/components/ui/AppInput";
import AppRangeSlider from "@/components/ui/AppRangeSlider";
import { formatNumber } from "@/functions/helpers";
import { useChangeSearchParams } from "@/hooks";
import { useState } from "react";

export default function Price() {
  const {params} = useChangeSearchParams();
  const min = 0;
  const max = 1_000_000; // 1 million

  const [price, setPrice] = useState<[number, number]>([Number(params.get('minPrice')) ?? min, Number(params.get('maxPrice')) ?? max]);

  return (
    <div className="flex flex-col gap-2 min-w-72">
      <div className="py-2 grid gap-2 grid-cols-2">
        <AppInput type="number" name="minPrice" placeholder="Min Price" value={price[0].toString()} />
        <AppInput type="number" name="maxPrice" placeholder="Max Price" value={price[1].toString()} />
      </div>
    </div>
  );
}

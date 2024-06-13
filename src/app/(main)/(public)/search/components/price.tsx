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
      <div className="pt-2">
        <input type="hidden" name="minPrice" value={price[0]} />
        <input type="hidden" name="maxPrice" value={price[1]} />
        <AppRangeSlider
          min={min}
          max={max}
          onChange={(e) => {
            setPrice([e.minValue, e.maxValue]);
          }}
          value={price}
        />
        <div className="flex justify-between">
          <span>{formatNumber(price[0], true)}</span>
          <span>{formatNumber(price[1], true)}</span>
        </div>
      </div>
    </div>
  );
}

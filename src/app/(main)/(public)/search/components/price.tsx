import AppRangeSlider from "@/components/ui/AppRangeSlider";
import { useState } from "react";

export default function Price() {
  const min = 100;
  const max = 1000000;

  const [price, setPrice] = useState([min, max]);

  return (
    <div className="flex flex-col gap-2 min-w-72">
      <div className="pt-2">
        <AppRangeSlider
          min={min}
          max={max}
          onChange={(e) => {
            setPrice([e.minValue, e.maxValue]);
          }}
        />
        <div className="flex justify-between">
          <span>&#8358;{price[0]}</span>
          <span>&#8358;{price[1]}</span>
        </div>
      </div>
      <button className="btn-dark-tiny py-2 w-full">Apply</button>
    </div>
  );
}

"use client";
import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";

export type AppRangeSliderProps = {
  min: number;
  max: number;
  onChange: (e: ChangeResult) => void;
};

export default function AppRangeSlider({
  min,
  max,
  onChange,
}: AppRangeSliderProps) {
  return (
    <MultiRangeSlider
      min={min}
      max={max}
      canMinMaxValueSame={false}
      onInput={(e: ChangeResult) => {
        // setMinValue(e.minValue);
        // setMaxValue(e.maxValue);
      }}
      onChange={onChange}
      label={false}
      ruler={false}
      style={{ border: "none", boxShadow: "none", padding: "15px 10px" }}
      barLeftColor="#3c3c4322"
      barInnerColor="#3c3c43"
      barRightColor="#3c3c4322"
      thumbLeftColor="#3c3c43"
      thumbRightColor="#3c3c43"
    />
  );
}

"use client";
import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";

export type AppRangeSliderProps = {
  min: number;
  max: number;
  value: [number, number];
  onChange: (e: ChangeResult) => void;
};

export default function AppRangeSlider({
  min,
  max,
  onChange,
  value,
}: AppRangeSliderProps) {
  return (
    <MultiRangeSlider
      min={min}
      max={max}
      canMinMaxValueSame={false}
      minValue={value[0]}
      maxValue={value[1]}
      onInput={onChange}
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

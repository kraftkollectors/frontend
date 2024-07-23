import { Fragment } from "react";

export type ServiceChargePickerProps = {
  value?: ServiceCharge;
};

export type ServiceCharge = (typeof options)[number];
const options = ["fixed", "hourly", "session"] as const;

export function ServiceChargePicker({
  value = "fixed",
}: ServiceChargePickerProps) {
  return (
    <div className="flex gap-2">
      {options.map((opt) => (
        <Fragment key={opt}>
          <input
            name="charge"
            type="radio"
            hidden
            className="radio-group hidden"
            id={opt}
            value={opt}
            defaultChecked={value == opt}
          />
          <label htmlFor={opt} className="rounded bg-light px-3 font-semibold">
            {opt}
          </label>
        </Fragment>
      ))}
    </div>
  );
}

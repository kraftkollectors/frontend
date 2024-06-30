'use client'

import { AppInputProps } from "./AppInput";

export type AppSelectProps = Omit<AppInputProps, "placeholder"> & {
  options:
    | string[]
    | {
        title: string;
        value: string;
      }[];
};

export default function AppSelect({ name, title, options, value, readonly, onChange, error:fieldError }: AppSelectProps) {
  return (
    <div>
      {title &&
        <label htmlFor={`${title}-select`} className="inline-block pb-1 text-black-300 text-label">
          {title}
        </label>}
      <select 
       onChange={(e)=>onChange?.(e.target.value)}
       disabled={readonly} defaultValue={value} name={name} id={`${title}-select`} className="app-select">
        {options.map((item, index) => {
          if (typeof item === "string")
            return (
              <option key={index} value={item}>
                {item}
              </option>
            );
          else
            return (
              <option key={index} value={item.value}>
                {item.title}
              </option>
            );
        })}
      </select>{fieldError && fieldError.length > 0 && (
        <p className="text-red-900 text-xs">{fieldError[0]}</p>
      )}
    </div>
  );
}

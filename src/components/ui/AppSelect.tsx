import { AppInputProps } from "./AppInput";

export type AppSelectProps = Omit<AppInputProps, "placeholder"> & {
  options:
    | string[]
    | {
        title: string;
        value: string;
      }[];
};

export default function AppSelect({ name, title, options, value }: AppSelectProps) {
  return (
    <div>
      {title &&
        <label htmlFor={`${title}-select`} className="inline-block pb-1">
          {title}
        </label>}
      <select defaultValue={value} name={name} id={`${title}-select`} className="app-select">
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
      </select>
    </div>
  );
}

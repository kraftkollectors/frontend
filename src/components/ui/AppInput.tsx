import { memo, useEffect, useRef, useState } from "react";
import { z } from "zod";

export type AppInputProps = {
  icon?: React.ReactNode;
  placeholder: string;
  value?: string;
  name: string;
  type?: string;
  schema?: z.ZodString;
  textarea?: boolean;
  ps?: string;
  title?: string;
  onChange?: (value: string) => void;
  onErrorChange?: (hasError: boolean) => void;
};

export default memo(function AppInput({
  icon,
  placeholder,
  value = "",
  name,
  type = "text",
  onChange,
  textarea = false,
  onErrorChange,
  schema,
  ps,
  title
}: AppInputProps) {
  const [val, setVal] = useState(value);
  const [error, setError] = useState<string | null>(null);
  const hasUpdated = useRef(false);

  useEffect(() => {
    if (schema)
      try {
        schema.parse(val);
        if (error != null && onErrorChange) {
          onErrorChange(false);
          setError(null);
        }
      } catch (e) {
        if (e instanceof z.ZodError && error == null && onErrorChange) {
          onErrorChange(true);
          setError(e.errors[0].message);
        }
      }
    else if (onErrorChange && !hasUpdated.current) {
      onErrorChange(false);
      hasUpdated.current = true;
    }
  });

  return (
    <div className="">
      {title &&
        <label htmlFor={`${title}-input`} className="inline-block pb-1">
          {title}
        </label>}
      <div className="relative">
        <span
          className={`absolute inline-block left-3 opacity-60 ${textarea
            ? "top-4"
            : "top-1/2 -translate-y-1/2"}`}
        >
          {icon}
        </span>
        {textarea
          ? <textarea
              id={`${title}-input`}
              name={name}
              placeholder={placeholder}
              rows={4}
              value={val}
              onChange={e => {
                setVal(e.target.value);
                if (onChange) onChange(e.target.value);
              }}
              className={` bg-light w-full border outline-primary text-dark-text py-3 ${!icon
                ? "ps-4"
                : "ps-9"} pe-4 rounded-md ${error ? "bg-red-100" : ""}`}
            />
          : <input
              id={`${title}-input`}
              name={name}
              placeholder={placeholder}
              type={type}
              value={val}
              onChange={e => {
                setVal(e.target.value);
                if (onChange) onChange(e.target.value);
              }}
              className={` bg-light w-full border outline-primary text-dark-text py-3 ${ps
                ? ps
                : !icon ? "ps-4" : "ps-9"} pe-4 rounded-md ${error
                ? "bg-red-100"
                : ""}`}
            />}
      </div>
      {error &&
        <p className="text-red-900 text-xs">
          {error}
        </p>}
    </div>
  );
});

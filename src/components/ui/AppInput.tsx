"use client";

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
  rows?: number;
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
  title,
  rows,
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
      {title && (
        <label htmlFor={`${title}-input`} className="inline-block pb-1">
          {title}
        </label>
      )}
      <div className="relative">
        <span
          className={`absolute inline-block left-3 opacity-60 ${
            textarea ? "top-4" : "top-1/2 -translate-y-1/2"
          }`}
        >
          {icon}
        </span>
        {textarea ? (
          <textarea
            id={`${title}-input`}
            name={name}
            placeholder={placeholder}
            rows={rows ?? 4}
            value={val}
            onChange={(e) => {
              setVal(e.target.value);
              if (onChange) onChange(e.target.value);
            }}
            className={`app-input ${!icon ? "ps-4" : "ps-9"} ${
              error ? "bg-red-100" : ""
            }`}
          />
        ) : (
          <input
            id={`${title}-input`}
            name={name}
            placeholder={placeholder}
            type={type}
            value={val}
            onChange={(e) => {
              setVal(e.target.value);
              if (onChange) onChange(e.target.value);
            }}
            className={`app-input ${ps ? ps : !icon ? "ps-4" : "ps-9"}  ${
              error ? "bg-red-100" : ""
            }`}
          />
        )}
      </div>
      {error && <p className="text-red-900 text-xs">{error}</p>}
    </div>
  );
});

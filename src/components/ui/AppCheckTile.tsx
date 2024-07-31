import { AppInputProps } from "./AppInput";

export type AppCheckTileProps = Omit<
  AppInputProps,
  "placeholder" | "textarea" | "type"
> & {
  checked?: boolean;
};

export default function AppCheckTile({
  name,
  value,
  title,
  checked,
}: AppCheckTileProps) {
  return (
    <div className="flex items-center gap-1">
      <input id={`${name}-check`} type="checkbox" defaultChecked={checked} name={name} value={value} />
      <label htmlFor={`${name}-check`}>
        {title}
      </label>
    </div>
  );
}

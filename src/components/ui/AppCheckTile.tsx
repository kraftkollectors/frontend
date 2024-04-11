import { AppInputProps } from "./AppInput";

export type AppCheckTileProps = Omit<
  AppInputProps,
  "placeholder" | "textarea" | "type"
>;

export default function AppCheckTile({
  name,
  value,
  title
}: AppCheckTileProps) {
  return (
    <div className="flex items-center gap-1">
      <input id={`${name}-check`} type="checkbox" name={name} value={value} />
      <label htmlFor={`${name}-check`}>
        {title}
      </label>
    </div>
  );
}

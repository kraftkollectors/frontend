import { ReactNode } from "react";

export type profileInfoLineProps = {
  icon: ReactNode;
  title: string;
  value: ReactNode;
};

export default function ProfileInfoLine({
  icon,
  title,
  value,
}: profileInfoLineProps) {
  return (
    <div className=" flex justify-between items-center">
      <div className="flex gap-1 items-center">
        <span className="black-300"> {icon} </span>
        <p className="text-black-300">{title}</p>
      </div>
      <p className="text-black-900">{value}</p>
    </div>
  );
}

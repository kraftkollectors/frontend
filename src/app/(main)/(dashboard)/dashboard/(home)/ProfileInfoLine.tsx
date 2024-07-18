import { ReactNode } from "react";

export type profileInfoLineProps = {
  icon: ReactNode;
  title: string;
  value: ReactNode;
  hideOnMobile?: boolean;
};

export default function ProfileInfoLine({
  icon,
  title,
  value,
  hideOnMobile = false,
}: profileInfoLineProps) {
  return (
    <div className=" flex justify-between items-center gap-4">
      <div className="flex gap-1 items-center">
        <span className="text-black-300"> {icon} </span>
        <p className={`text-black-300 ${hideOnMobile ? "max-md:hidden" : ""}`}>{title}</p>
      </div>
      <div className="text-black-900">{value}</div>
    </div>
  );
}

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
    <div className="flex items-center justify-between gap-4">
      <div className="flex flex-shrink-0 items-center gap-1">
        <span className="text-black-300"> {icon} </span>
        <p className={`text-black-300 ${hideOnMobile ? "max-md:hidden" : ""}`}>
          {title}
        </p>
      </div>
      <div className="line-clamp-1 w-full text-right text-black-900">
        {value}
      </div>
    </div>
  );
}

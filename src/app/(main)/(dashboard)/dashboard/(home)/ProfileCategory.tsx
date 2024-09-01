import { ReactNode } from "react";

export type ProfileCategoryProps = {
  title: string;
  action: ReactNode;
  children: ReactNode;
};

export default function ProfileCategory({
  title,
  action,
  children,
}: ProfileCategoryProps) {
  return (
    <div className="flex flex-col gap-2 ">
      <div className="flex gap-2 items-center">
        <p className="font-semibold text-black-900">{title}</p>
        <>{action}</>
      </div>
      {children}
    </div>
  );
}

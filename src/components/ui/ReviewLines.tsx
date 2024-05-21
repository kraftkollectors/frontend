
import type { CustomFlowbiteTheme } from 'flowbite-react';
import { Progress } from 'flowbite-react';
import { FaStar } from "react-icons/fa6";

const customTheme: CustomFlowbiteTheme["progress"] = {
  color: {
    yellow: "bg-secondary-accent"
  }
};
export type ReviewLineProps = {
  label: number;
  value: number;
  percentage: number;
};
export function ReviewLines({ label, value, percentage }: ReviewLineProps) {
  return (
    <div className="w-full flex gap-2 items-center">
      <div className="w-8 flex-shrink-0 flex gap-1 items-center">
        <span>
          {label}
        </span>
        <FaStar />
      </div>
      <div className="w-full flex-shrink">
        <Progress
          theme={customTheme}
          size="sm"
          progress={percentage}
          color="yellow"
        />
      </div>
      <div className="w-8 flex-shrink-0">
        {value}
      </div>
    </div>
  );
}

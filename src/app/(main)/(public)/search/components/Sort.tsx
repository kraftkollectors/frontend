// import { Radio } from "@radix-ui/themes";
import { Radio } from "flowbite-react";
export default function Sort() {
  return (
    <div className="flex gap-2 flex-col">
      {options.map((option) => {
        const id = option.toLocaleLowerCase().replaceAll(" ", "");
        return (
          <label htmlFor={id} key={option} className="flex gap-1 items-center">
            <Radio name="sortBy" id={id} value={option} />
            <span>{option}</span>
          </label>
        );
      })}
    </div>
  );
}

const options = ["Best Rating", "Latest", "Lowest Price", "Highest Price"];

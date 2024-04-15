import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";

export default function Rating() {
  const [selected, setSelected] = useState(0);
  return (
    <>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          onClick={() => {
            if (selected === i) setSelected(0);
            else setSelected(i);
          }}
          key={i}
          selected={i <= selected}
        />
      ))}
    </>
  );
}

type StarProps = {
  selected: boolean;
  onClick: () => void;
};
function Star({ selected = false, onClick }: StarProps) {
  return (
    <button onClick={onClick}>{selected ? <FaStar /> : <FaRegStar />}</button>
  );
}

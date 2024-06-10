import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";

export default function Rating() {
  const [selected, setSelected] = useState(1);
  return (
    <>
    <input type="text" name="rating" hidden value={selected} />
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          onClick={() => {
            if (selected === i) setSelected(1);
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
    <button type="button" role="button" onClick={onClick}>{selected ? <FaStar /> : <FaRegStar />}</button>
  );
}

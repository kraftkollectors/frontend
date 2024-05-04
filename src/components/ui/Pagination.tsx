import React from "react";

export function Pagination() {
  return (
    <section className="flex  gap-2 items-center">
      <button className="text-black-200">Prev</button>
      <div className="flex gap-2 items-center justify-center">
        {PageNumbers.map((item, index) => (
          <button
            className={`border rounded py-1 px-3 hover:bg-primary-lightActive ${
              item.active ? "bg-primary text-light-text" : ""
            }`}
            key={index}
          >
            {item.number}
          </button>
        ))}
      </div>
      <button className="text-black-800">Next</button>
    </section>
  );
}

const PageNumbers = [
  {
    number: 1,
    active: true,
  },
  {
    number: 2,
  },
  {
    number: 3,
  },
  {
    number: 4,
  },
  {
    number: 5,
  },
  {
    number: 6,
  },
];

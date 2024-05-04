import { FaEdit, FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

export type DashboardServiceCardProps = {
  img: string;
  title: string;
  price: string;
  id: string;
};

export function DashboardServiceCard({
  img,
  title,
  price,
  id,
}: DashboardServiceCardProps) {
  return (
    <div className="flex gap-2 p-2 bg-light border rounded">
      <img
        src={img}
        alt=""
        className="w-4/12 md:w-40 h-full aspect-[5/3] object-cover"
      />
      <div className="flex flex-col gap-1">
        <p className="text-back-400">{title}</p>
        <p className="text-black-600 font-semibold">{price}</p>
        <div className="flex gap-2">
          <button className="edit-btn">
            <FaRegEdit />
            Edit
          </button>
          <button className="delete-btn">
            <RiDeleteBin6Line />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

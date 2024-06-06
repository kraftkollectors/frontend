/* eslint-disable @next/next/no-img-element */
import { paths } from "@/utils";
import Link from "next/link";
import { FaEdit, FaRegEdit } from "react-icons/fa";
import DeleteServiceModal from "./DeleteServiceModal";

export type DashboardServiceCardProps = {
  coverPhoto: string;
  title: string;
  description: string;
  estimatedPrice: string;
  _id: string;
};

export function DashboardServiceCard(props: DashboardServiceCardProps) {
  const {
    coverPhoto, title, estimatedPrice} = props;
  return (
    <div className="flex gap-2 p-2 bg-light border rounded">
      <img
        src={coverPhoto}
        alt={title}
        className="w-4/12 md:w-40 h-full aspect-[5/3] object-cover rounded profile-img"
      />
      <div className="flex flex-col gap-1">
        <p className="text-back-400">{title}</p>
        <p className="text-black-600 font-semibold">{estimatedPrice}</p>
        <div className="flex gap-2">
          <Link href={paths.dashboardEditService(props._id)} className="edit-btn">
            <FaRegEdit />
            Edit
          </Link>
          <DeleteServiceModal {...props} />
        </div>
      </div>
    </div>
  );
}

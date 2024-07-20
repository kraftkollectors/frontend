/* eslint-disable @next/next/no-img-element */
import { paths } from "@/utils";
import Link from "next/link";
import { FaEdit, FaRegEdit } from "react-icons/fa";
import DeleteServiceModal from "./DeleteServiceModal";
import { formatNumber } from "@/functions/helpers";

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
      <Link href={paths.service(props._id)} className="block w-4/12 aspect-[4/3] md:w-[200px]">
      <img
        src={coverPhoto}
        alt={title}
        className="object-cover rounded profile-img w-full h-full"
      />
      </Link>
      <div className="flex flex-col gap-1">
        <Link href={paths.service(props._id)} className="text-back-400">{title}</Link>
        <p className="text-black-600 font-semibold">{formatNumber(Number(estimatedPrice), true)}</p>
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

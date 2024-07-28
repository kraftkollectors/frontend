/* eslint-disable @next/next/no-img-element */
import { paths } from "@/utils";
import Link from "next/link";
import { FaEdit, FaRegEdit } from "react-icons/fa";
import DeleteServiceModal from "./DeleteServiceModal";
import { formatNumber } from "@/functions/helpers";
import { Suspense } from "react";
import ServiceViews from "./ServiceViews";

export type DashboardServiceCardProps = {
  coverPhoto: string;
  title: string;
  description: string;
  estimatedPrice: string;
  _id: string;
};

export function DashboardServiceCard(props: DashboardServiceCardProps) {
  const { coverPhoto, title, estimatedPrice } = props;
  return (
    <div className="flex gap-2 rounded border bg-light p-2">
      <Link
        href={paths.service(props._id)}
        className="block aspect-[4/3] w-4/12 flex-shrink-0 md:w-[200px]"
      >
        <img
          src={coverPhoto}
          alt={title}
          className="profile-img h-full w-full rounded object-cover"
        />
      </Link>
      <div className="flex w-full flex-col gap-1">
        <Link
          href={paths.service(props._id)}
          className="text-back-400 line-clamp-2"
        >
          {title}
        </Link>
        <p className="font-semibold text-black-600">
          {formatNumber(Number(estimatedPrice), true)}
        </p>
        <div className="flex w-full flex-wrap justify-between">
          <div className="inline-flex flex-shrink-0 gap-2">
            <Link
              href={paths.dashboardEditService(props._id)}
              className="edit-btn"
            >
              <FaRegEdit />
              Edit
            </Link>
            <DeleteServiceModal {...props} />
          </div>
          <Suspense fallback={<div className="skeleton h-5 w-8"></div>}>
            <ServiceViews id={props._id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

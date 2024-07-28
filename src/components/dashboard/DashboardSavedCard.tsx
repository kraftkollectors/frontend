/* eslint-disable @next/next/no-img-element */
"use client";

import { toggleFavourite } from "@/actions";
import { formatNumber } from "@/functions/helpers";
import { Service } from "@/utils/types/service";
import { useLayoutEffect } from "react";
import { useFormState } from "react-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";
import UserAuth from "../server/UserAuth";
import AppToast from "../Toast";
import { FormButton } from "../ui/FormButton";
import Link from "next/link";
import { paths } from "@/utils";

export type DashboardSavedCardProps = {
  img: string;
  title: string;
  price: string;
  id: string;
};

export function DashboardSavedCard({
  coverPhoto,
  title,
  estimatedPrice,
  _id,
}: Service) {
  const [res, action] = useFormState(toggleFavourite, {});
  useLayoutEffect(() => {
    if (res.error) toast(<AppToast.error message={res.error} />);
    if (res.success) toast(<AppToast.success message={res.success} />);
  }, [res]);

  return (
    <div className="flex gap-2 rounded border bg-light p-2">
      <Link
        href={paths.service(_id)}
        className="block aspect-[4/3] w-4/12 flex-shrink-0 md:w-[200px]"
      >
        <img
          src={coverPhoto}
          alt={title}
          className="profile-img h-full w-full rounded object-cover"
        />
      </Link>
      <div className="flex w-full flex-col gap-1">
        <Link href={paths.service(_id)}>
          <h3 className="text-back-400 line-clamp-2">{title}</h3>
        </Link>
        <p className="font-semibold text-black-600">
          {formatNumber(Number(estimatedPrice), true)}
        </p>
        <form action={action} className="flex gap-2">
          <FormButton className="delete-btn">
            <RiDeleteBin6Line />
            Remove
          </FormButton>
          <UserAuth />
          <input type="hidden" name="serviceId" value={_id} hidden />
          <input type="hidden" name="delete" value={"true"} hidden />
        </form>
      </div>
    </div>
  );
}

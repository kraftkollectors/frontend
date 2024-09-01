"use client";

import { checkFavourite, toggleFavourite } from "@/actions";
import { debugLog } from "@/functions/helpers";
import { HTMLAttributes, useEffect, useLayoutEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { FormButton } from "./FormButton";
import { useFormState } from "react-dom";
import UserAuth from "../server/UserAuth";
import { toast } from "react-toastify";
import AppToast from "../Toast";

export type FavouriteButtonProps = HTMLAttributes<HTMLButtonElement> & {
  serviceId: string;
};
export function FavouriteButton({
  serviceId,
  className,
  ...props
}: FavouriteButtonProps) {
  const [isFav, setIsFav] = useState<boolean | null>(false);
  const [res, action] = useFormState(toggleFavourite, {});

  useEffect(() => {
    // debugLog(`effect ${serviceId}`)
    async function check() {
      const req = await checkFavourite(serviceId);
      setIsFav(req);
    }

    check();
  }, [serviceId]);

  useLayoutEffect(() => {
    if (res.success) setIsFav(res.data);
    else if (res.error) toast(<AppToast.error message={res.error} />);
  }, [res]);

  return (
    <form action={action}>
      <FormButton
        title="add to favourites"
        {...props}
        className={`inline-flex size-8 items-center justify-center rounded-md bg-light shadow ${className}`}
      >
        {isFav ? <FaHeart className="text-black-600" /> : <FaRegHeart />}
      </FormButton>
      <UserAuth />
      <input type="hidden" name="serviceId" defaultValue={serviceId} />
      <input type="hidden" name="delete" defaultValue={`${isFav}`} />
    </form>
  );
}

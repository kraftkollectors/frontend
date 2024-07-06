/* eslint-disable @next/next/no-img-element */
import AppIcons from "@/components/AppIcons";
import { addDays, formatDate } from "@/functions/date";
import { fullName } from "@/functions/helpers";
import OptionsPopOver from "./OptionsPopOver";
import SmallComponents from "@/components/SmallComponents";
import { ContactMessage } from "@/utils/types/contact";
import { Suspense } from "react";
import { Advert } from "@/utils/types/advert";

export default function TableRow({
  _id,
  title,
  createdAt,
  duration,
  image,
  isActive,
  startDate,
  url,
}: Advert) {
  return (
    <tr className=" text-black-400 font-semibold text-label bg-light border-b first-of-type:bg-red-400 typ">
      <td className="py-1 flex gap-2 items-center w-80">
        <p className=" max-w-80 line-clamp-2">{title}</p>
      </td>
      <td className="py-1">
        <img src={image} alt={title} className="rounded-md w-20 aspect-[4/3] bg-black-50 object-contain" />
      </td>
      <td>
        <a href={url}>{url.split('//').pop() || url}</a>
      </td>
      <td className="py-1">{formatDate(startDate)}</td>
      <td className="py-1">{formatDate(addDays(createdAt, duration))}</td>
      <td className="py-1">{duration} Day{Number(duration) === 1 ? '' : 's'}</td>
      <td className="py-1">
        {isActive
          ? <span className="p-1 bg-dark text-light text-small rounded">Active</span>
          : <span className="p-1 bg-black-50 text-black-400 text-small rounded">Inactive</span>
        }
      </td>
      <td className="py-1">
        <Suspense><OptionsPopOver id={_id} /></Suspense>
      </td>
    </tr>
  );
}

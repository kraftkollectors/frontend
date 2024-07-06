import { formatDate } from "@/functions/date";
import OptionsPopOver from "./OptionsPopOver";
import { Service } from "@/utils/types/service";
import { UserName } from "@/components/admin";

export default function TableRow({
  _id,
   category,
   subCategory,
   title,
   userId,
   createdAt,
   active
}: Service) {
  return (
    <tr className=" text-black-400 font-semibold text-label bg-light border-b first-of-type:bg-red-400 typ">
      <td className="py-1 flex gap-2 items-center">
       {title}
      </td>
       <td>
       <UserName userId={userId} />
       </td>
       <td>{category}</td>
       <td>{subCategory}</td>

      <td className="py-1">{formatDate(createdAt)}</td>
      <td className="py-1">
        <OptionsPopOver id={_id} active={active} />
      </td>
    </tr>
  );
}

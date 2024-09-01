import AppIcons from "@/components/AppIcons";
import { formatDate } from "@/functions/date";
import { fullName } from "@/functions/helpers";
import { Payment } from "@/utils/types/payment";
import OptionsPopOver from "./OptionsPopOver";
import SmallComponents from "@/components/SmallComponents";

export default function TableRow({
  _id,
  amount,
  date,
  plan: duration,
  active: isActive,


 
}:Payment) {
  return (
    <tr className=" text-black-400 font-semibold text-label bg-light border-b first-of-type:bg-red-400 typ">
      <td className="py-2">{"example@gmail.com"}</td>
      <td className="py-1">{"kesh"}</td>
      <td className="py-1">{amount}</td>
      <td className="py-1">{formatDate(date)}</td>
      <td className="py-1">
      {!isActive ? (
          <SmallComponents.Resolved />
        ) : (
          <SmallComponents.ActivePayment />
        )}
      </td>
      <td className="py-1">
        <span className="p-1 bg-primary-lightActive2 rounded">{duration}</span>
      </td>
      <td className="py-1">
        <OptionsPopOver id={_id} />
      </td>
    </tr>
  );
}

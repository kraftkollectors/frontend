import AppIcons from "@/components/AppIcons";
import { formatDate } from "@/functions/date";
import { fullName } from "@/functions/helpers";
import OptionsPopOver from "./OptionsPopOver";
import SmallComponents from "@/components/SmallComponents";
import { ContactMessage } from "@/utils/types/contact";
import { Suspense } from "react";

export default function TableRow({
  _id,
  email,
  name,
  createdAt,
  resolved,
  read,
}: ContactMessage) {
  return (
    <tr className=" text-black-400 font-semibold text-label bg-light border-b first-of-type:bg-red-400 typ">
      <td className="py-1 flex gap-2 items-center">
        {
          read ? <AppIcons.RoundFeedback /> : <AppIcons.RoundFeedbackNew /> 
        }
        <div className="flex flex-col leading-tight">
          <h2>{fullName(name)}</h2>
          <p className="py-2">{email}</p>
        </div>
      </td>

      <td className="py-1">{formatDate(createdAt)}</td>
      <td className="py-1">
        {resolved ? (
          <SmallComponents.Resolved />
        ) : (
          <SmallComponents.EndedPayment />
        )}
      </td>
      <td className="py-1">
        <Suspense><OptionsPopOver id={_id} /></Suspense>
      </td>
    </tr>
  );
}

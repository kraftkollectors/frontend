import AppIcons from "@/components/AppIcons";
import { formatDate } from "@/functions/date";
import { fullName } from "@/functions/helpers";
import { UserDetails } from "@/utils/types/user";
import OptionsPopOver from "./OptionsPopOver";
import SmallComponents from "@/components/SmallComponents";
import { ContactMessage } from "@/utils/types/contact";
import { Report } from "@/utils/types/reports";

export default function TableRow({
  _id,
  reportedId,
  createdAt,
  resolved,
  read,
}: Report) {
  return (
    <tr className=" text-black-400 font-semibold text-label bg-light border-b first-of-type:bg-red-400 typ">
      <td className="py-1 flex gap-2 items-center">
        {
          read ? <AppIcons.RoundReport /> : <AppIcons.RoundReportNew /> 
        }
        <div className="flex flex-col leading-tight">
          <h2>{fullName(reportedId)}</h2>
          {/* <p className="py-2">{email}</p> */}
        </div>
      </td>
       <td>
       <div className="flex flex-col">
          <p> I Will Create the Ultimate Sound track for your...</p>
          <p>Entertainment | Dj</p>
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
        <OptionsPopOver id={_id} />
      </td>
    </tr>
  );
}

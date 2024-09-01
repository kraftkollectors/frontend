import AppIcons from "@/components/AppIcons";
import { formatDate } from "@/functions/date";
import { fullName } from "@/functions/helpers";
import { UserDetails } from "@/utils/types/user";
import OptionsPopOver from "./OptionsPopOver";
import SmallComponents from "@/components/SmallComponents";
import { ContactMessage } from "@/utils/types/contact";
import { Report } from "@/utils/types/reports";
import { ServiceCell, UserCell } from "./components/TableRowCells";

export default function TableRow({
  _id,
  reporterId,
  createdAt,
  resolved,
  read,postId
}: Report) {
  return (
    <tr className=" text-black-400 font-semibold text-label bg-light border-b">
      <td className="py-1 flex gap-2 items-center">
        {
          read ? <AppIcons.RoundReport /> : <AppIcons.RoundReportNew /> 
        }
        <UserCell userId={reporterId} />
      </td>
       <td>
       <ServiceCell serviceId={postId} />
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

import AppIcons from "@/components/AppIcons";
import { formatDate } from "@/functions/date";
import { fullName } from "@/functions/helpers";
import { UserDetails } from "@/utils/types/user";
import OptionsPopOver from "./OptionsPopOver";
import SmallComponents from "@/components/SmallComponents";

export default function TableRow({
  _id,
  email,
  firstName,
  createdAt,
  isArtisan,
  userName,
  lastName,
}: UserDetails) {
  return (
    <tr className=" text-black-400 font-semibold text-label bg-light border-b first-of-type:bg-red-400 typ">
      <td className="py-1 flex gap-2 items-center">
        <AppIcons.RoundFeedbackNew /> 
        <div className="flex flex-col leading-tight">
          <h2>{fullName(firstName, lastName)}</h2>
          <p className="py-2">{email}</p>
        </div>
      </td>

      <td className="py-1">{formatDate(createdAt)}</td>
      <td className="py-1">
        {isArtisan ? (
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

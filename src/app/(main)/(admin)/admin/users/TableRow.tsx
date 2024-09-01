import AppIcons from "@/components/AppIcons";
import { formatDate } from "@/functions/date";
import { fullName } from "@/functions/helpers";
import { UserDetails } from "@/utils/types/user";
import OptionsPopOver from "./OptionsPopOver";

export default function TableRow({
  _id,
  email,
  firstName,
  createdAt,
  isArtisan,
  userName,
  lastName,
  active
}: UserDetails) {
  return (
    <tr className=" text-black-400 font-semibold text-label bg-light border-b first-of-type:bg-red-400 typ">
      <td className="py-2">{email}</td>
      <td className="py-1">{fullName(firstName, lastName)}</td>
      <td className="py-1">@{userName}</td>
      <td className="py-1">{formatDate(createdAt)}</td>
      <td className="py-1">
        {isArtisan ? (
          <span className="text-[#599f79] inline-flex items-center gap-2 text-small">
            Verified <AppIcons.Verified />
          </span>
        ) : (
          <span className="text-[#a87b3b] bg-[#FAF1E5] p-1 rounded-md text-small">
            unverifed
          </span>
        )}
      </td>
      <td className="py-1">none</td>
      <td className="py-1">
        <OptionsPopOver id={_id} active={active} />
      </td>
    </tr>
  );
}

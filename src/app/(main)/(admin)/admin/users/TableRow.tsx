import AppIcons from "@/components/AppIcons";
import { formatDate } from "@/functions/date";
import { fullName } from "@/functions/helpers";
import { UserDetails } from "@/utils/types/user";
import OptionsPopOver from "./OptionsPopOver";

export default function TableRow({_id, email, firstName, createdAt, isArtisan, userName, lastName   }:UserDetails) {
    
    return (
        <tr className=" text-black-400 font-semibold text-label">
            <td>
                <p className="py-1">
                    {email}
                </p>
            </td>
            <td>
                <p className="py-1">
                    {fullName(firstName, lastName)}
                </p>
            </td>
            <td>
                <p className="py-1">
                   @{userName}
                </p>
            </td>
            <td>
                <p className="py-1">
                    {formatDate(createdAt)}
                </p>
            </td>
            <td>
                <p className="py-1">
                    {isArtisan? 
                    <span className="text-[#599f79] inline-flex">Verified <AppIcons.Verified /></span>:
                    <span className="text-[#a87b3b] bg-[#FAF1E5] p-1 rounded-md">unverifed</span>
                    }
                </p>
            </td>
            <td>
                <p className="py-1">
                   none
                </p>
            </td>
            <td>
                <p className="py-1">
                   <OptionsPopOver id={_id}/>
                </p>
            </td>
        </tr>
    );
}
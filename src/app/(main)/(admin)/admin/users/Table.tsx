import { UserDetails } from "@/utils/types/user";
import TableRow from "./TableRow";
import { fetchUsers } from "@/actions";
import { Pagination } from "@/components";

export default async function Table({query}:{query: string}) {
  const users = await fetchUsers({ throwsError: false, params: query });
  if (users === 'error' || !users) throw new Error('Connection error | Failed to load Users');
  
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-[800px] w-full rounded-md overflow-hidden app-table">
        <tbody>
          <tr className="bg-black-50 font-bold rounded-md rounded-br-md rounded-bl-md">
            <td className="py-2">Email</td>
            <td>Fullname</td>
            <td>Username</td>
            <td>Created</td>
            <td>Accout Type</td>
            <td>Active Payment</td>
            <td></td>
          </tr>
          <tr><td className="p-2"></td></tr>
          {
            users.existingRecords.length === 0 ? <tr><td colSpan={7}><div className="info-box">No users found</div></td></tr> :
            users.existingRecords.map(user=><TableRow key={user._id} {...user} />)
          }
        </tbody>
      </table>
      <Pagination pagination={users} />
    </div>
  );
}

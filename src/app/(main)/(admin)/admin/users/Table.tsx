import { UserDetails } from "@/utils/types/user";
import TableRow from "./TableRow";

export default function Table() {
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
          <TableRow
            {...{
              firstName: "Kesh",
              lastName: "Maduakolam",
              email: "john@gmail.com",
              _id: "nj5jjjtjkjtkkkk",
              userName: "kesh",
              createdAt: "10-12-2023 12:02:45",
              isArtisan: true,
            } as UserDetails
            }
          />
          <TableRow
            {...{
              firstName: "Kesh",
              lastName: "Maduakolam",
              email: "john@gmail.com",
              _id: "nj5jjjtjkjtkkkk",
              userName: "kesh",
              createdAt: "10-12-2023 12:02:45",
              isArtisan: false,
            } as UserDetails
            }
          />
        </tbody>
      </table>
    </div>
  );
}

import { UserDetails } from "@/utils/types/user";
import TableRow from "./TableRow";

export default function Table() {
    return (
        <table>
            <tbody>
            <tr className="bg-black-50 py-3 font-bold">
                <th>Email</th>
                <th>Fullname</th>
                <th>Username</th>
                <th>Created</th>
                <th>Accout Type</th>
                <th>Active Payment</th>
                <th></th>

            </tr>
                <TableRow 
                {...{
                    firstName: "Kesh",
                    lastName:"Maduakolam",
                    email: "john@gmail.com",
                    _id: "nj5jjjtjkjtkkkk",
                    userName: "kesh",
                    createdAt: "10-12-2023 12:02:45",
                    isArtisan: true,
                } as UserDetails}
                 />
            </tbody>
    
        </table>
    );
}
import TableRow from "./TableRow";
import { dummyPayment } from "@/utils/dummy";

export default function Table() {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-[800px] w-full rounded-md overflow-hidden app-table">
        <tbody>
          <tr className="bg-black-50 font-bold rounded-md rounded-br-md rounded-bl-md">
            <td className="py-2">Email</td>
            <td>Name</td>
            <td>Amount paid</td>
            <td>Date</td>
            <td>Status</td>
            <td>Plan</td>
            <td></td>
          </tr>
          <tr><td className="p-2"></td></tr>
          <TableRow
            {...dummyPayment
            }
          />
          <TableRow
            {...dummyPayment
            }
          />
        </tbody>
      </table>
    </div>
  );
}

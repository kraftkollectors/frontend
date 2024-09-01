import { fetchPayments } from "@/actions/admin";
import TableRow from "./TableRow";
import { Pagination } from "@/components";

export default async function Table({ query }: { query: string }) {
  const payments = await fetchPayments({ throwsError: false, params: query });
  if (payments === 'error' || !payments) throw new Error('Connection error | Failed to load Transactions');

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
          {
            payments.existingRecords.length === 0 ? <tr><td colSpan={7}><div className="info-box">No payments found</div></td></tr> :
              payments.existingRecords.map(payment => <TableRow key={payment._id} {...payment} />)
          }
        </tbody>
      </table>
      <Pagination pagination={payments} />
    </div>
  );
}

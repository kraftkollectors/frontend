import { UserDetails } from "@/utils/types/user";
import TableRow from "./TableRow";
import { dummyContact } from "@/utils/dummy";
import { Suspense } from "react";
import SingleReport from "./SingleReport";

export default function Table() {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-[800px] w-full rounded-md overflow-hidden app-table">
        <tbody>
          <tr className="bg-black-50 font-bold rounded-md rounded-br-md rounded-bl-md">
            <td className="py-2 !ps-12">Message From</td>
            <td>Reported post</td>
            <td>Date</td>
            <td>Status</td>
            <td></td>
          </tr>
          <tr>
            <td className="p-2"></td>
          </tr>
          <TableRow {...dummyContact} />
          <TableRow {...dummyContact} />
        </tbody>
      </table>
      <Suspense>
        <SingleReport />
      </Suspense>
    </div>
  );
}

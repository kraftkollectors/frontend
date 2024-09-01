import TableRow from "./TableRow";
import { Suspense } from "react";
import SingleReport from "./SingleReport";
import { fetchReports, fetchServices } from "@/actions";
import { Pagination } from "@/components";

export default async function Table({query}:{query: string}) {
  const reports = await fetchReports({ throwsError: false, params: query });
  if (reports === 'error' || !reports) throw new Error('Connection error | Failed to load Reports');
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
          {
            reports.existingRecords.length === 0 ? <tr><td colSpan={5}><div className="info-box">No report found</div></td></tr> :
            reports.existingRecords.map(report=><TableRow key={report._id} {...report} />)
          }
        </tbody>
      </table>
      <Pagination pagination={reports} />
      <Suspense>
        <SingleReport />
      </Suspense>
    </div>
  );
}

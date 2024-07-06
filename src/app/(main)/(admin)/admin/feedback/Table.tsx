import TableRow from "./TableRow";
import { Suspense } from "react";
import SingleFeedback from "./SingleFeedback";
import { fetchFeedbacks } from "@/actions";

export default async function Table({query}:{query: string}) {
  const feedbacks = await fetchFeedbacks({ throwsError: false, params: query });
  if (feedbacks === 'error' || !feedbacks) throw new Error('Connection error | Failed to load feedback');
  
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-[800px] w-full rounded-md overflow-hidden app-table">
        <tbody>
          <tr className="bg-black-50 font-bold rounded-md rounded-br-md rounded-bl-md">
            <td className="py-2 !ps-12">Message From</td>
            <td>Date</td>
            <td>Status</td>
            <td></td>
          </tr>
          <tr>
            <td className="p-2"></td>
          </tr>
          {
            feedbacks.existingRecords.length === 0 ? <tr><td colSpan={4}><div className="info-box">No feedback found</div></td></tr> :
            feedbacks.existingRecords.map(feedback=><TableRow key={feedback._id} {...feedback} />)
          }
        </tbody>
      </table>
      <Suspense>
        <SingleFeedback />
      </Suspense>
    </div>
  );
}

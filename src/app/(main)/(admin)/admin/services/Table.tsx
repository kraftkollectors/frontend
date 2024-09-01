import TableRow from "./TableRow";
import { Pagination } from "@/components";
import { adminFetchServices } from "@/actions/admin";
import { debugLog } from "@/functions/helpers";

export default async function Table({query}:{query: string}) {
  const services = await adminFetchServices({ throwsError: false, params: query });
  if (services === 'error' || !services) throw new Error('Connection error | Failed to load Services');
  debugLog(services.existingRecords)
  
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-[800px] w-full rounded-md overflow-hidden app-table">
        <tbody>
          <tr className="bg-black-50 font-bold rounded-md rounded-br-md rounded-bl-md">
            <td className="py-2 ">Service title</td>
            <td>Posted by</td>
            <td>Category</td>
            <td>Subcategory</td>
            <td> Date</td>
            <td></td>
          </tr>
          <tr>
            <td className="p-2"></td>
          </tr>
          {
            services.existingRecords.length === 0 ? <tr><td colSpan={6}><div className="info-box">No services found</div></td></tr> :
            services.existingRecords.map(service=><TableRow key={service._id} {...service} />)
          }
        </tbody>
      </table>
      <Pagination pagination={services} />
    </div>
  );
}

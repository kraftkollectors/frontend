import TableRow from "./TableRow";
import { dummyAdvert } from "@/utils/dummy";
import { Suspense } from "react";
import NewAdvert from "./NewAdvert";
import EditAdvert from "./EditAdvert";

export default function Table() {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-[800px] w-full rounded-md overflow-hidden app-table">
        <tbody>
          <tr className="bg-black-50 font-bold rounded-md rounded-br-md rounded-bl-md">
            <td className="py-2 max-w-80 w-80">Advert title</td>
            <td>Image</td>
            <td>Link</td>
            <td>Start date</td>
            <td>End date</td>
            <td>Duration</td>
            <td>Status</td>
            <td></td>
          </tr>
          <tr>
            <td className="p-2"></td>
          </tr>
          <TableRow {...dummyAdvert} />
          <TableRow {...dummyAdvert} />
        </tbody>
      </table>
      <Suspense>
        <NewAdvert />
        <EditAdvert />
      </Suspense>
    </div>
  );
}

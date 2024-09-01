
import Certificates from "./Certificates";
import Educations from "./Educations";
import { Suspense } from "react";
import Description from "./Description";
import AwayMessage from "./AwayMessage";
import { fetchUser } from "@/actions";

export default async function ProfileCategories() {
  const user = await fetchUser({throwsError: false});
  if(!user || user == 'error' || !user.isArtisan) return <></>

  return (
    <div className=" flex flex-col p-4 rounded-md bg-light gap-2 border">
      <Suspense fallback={<div className="skeleton w-full h-20"></div>}><AwayMessage /></Suspense>
      <Suspense fallback={<div className="skeleton w-full h-20"></div>}><Description /></Suspense>
      <Suspense fallback={<div className="skeleton w-full h-20"></div>}><Educations /></Suspense>
      <Suspense fallback={<div className="skeleton w-full h-20"></div>}><Certificates /></Suspense>
    </div>
  );
}

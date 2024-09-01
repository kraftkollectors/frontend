import { fetchUser } from "@/actions";
import { fullName } from "@/functions/helpers";

/* eslint-disable @next/next/no-img-element */
export default async function UserProfile({ userId }: { userId: string }) {
  const artisan = await fetchUser({
    params: userId,
    isPublic: true,
    throwsError: false,
  });
  if (!artisan || artisan == "error")
    return (
      <>
        <div className="skeleton avatar size-6"></div>
        <div className="skeleton h-4 w-20"></div>
      </>
    );

  const fullname = fullName(artisan.firstName, artisan.lastName);
  return (
    <>
      <img
        loading="lazy"
        src={artisan.image}
        alt={"service by: " + fullname}
        className="avatar profile-img size-6 flex-shrink-0"
      />
      <h2 className="line-clamp-1 text-label font-bold">{fullname}</h2>
    </>
  );
}

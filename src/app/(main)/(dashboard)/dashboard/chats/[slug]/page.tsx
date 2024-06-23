import { notFound } from "next/navigation";
import Main from "./Main";
import { fetchUser } from "@/actions";
import { AppPageProps } from "@/utils/types/basicTypes";

export default async function page({ params }: AppPageProps<{ slug: string }>) {
  const userId = params?.slug;
  if (!userId) notFound();
  const user = await fetchUser({ isPublic: true, params: userId });
  if (!user) notFound();
  if (user == 'error') throw new Error("Connection error");
  
  return (
    <section className="h-full flex flex-col justify-stretch">
      <Main key={userId} guest={user} />
    </section>
  );
}

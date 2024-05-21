
import Main from "./Main";
import Profile from "./Profile";
import SimilarPosts from "./SimilarPosts";

export default function Page() {
  return (
    <>
    <section className="md:app-container md:pt-5 pb-10 bg-gray-100">
      <div className="pb-6 flex gap-2 max-md:hidden text-label text-black-400 font-semibold">
        <span>home</span> &gt;
        <span>Event Planning</span> &gt;
        <span>Music</span> &gt;
        <span>How to play song</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-11 gap-4 md:gap-6">
        <Main />
       <div className="max-md:hidden md:col-span-4 md:sticky top-6 h-fit">
        <Profile />
       </div>
      </div>
    </section>
    <SimilarPosts />
    </>
  );
}


import Main from "./Main";
import Profile from "./Profile";

export default function Page() {
  return (
    <>
    <section className="app-container py-10 lg:bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-11 gap-4 md:gap-6">
        <Main />
       <Profile />
      </div>
    </section>
    </>
  );
}

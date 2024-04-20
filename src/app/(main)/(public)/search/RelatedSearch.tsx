import { dummyRelatedSearch } from "@/utils/dummy";
export default function RelatedSearch() {
  return (
    <section className="flex gap-2 bg-secondary-lightHover app-container py-2 items-center">
      <p>Related search</p>
      <div className="flex rounded-3xl p-1 gap-2">
        {dummyRelatedSearch.map((item) => (
          <button
            className="text-label border border-black-800 rounded-3xl p-1 px-2"
            key={item.id}
          >
            {item.title}
          </button>
        ))}
      </div>
    </section>
  );
}

import { fetchAdverts } from "@/actions";
import { AdsSlider } from "@/components/mediaSlider/AdsSlider";

export default async function AdsColumn() {
  const adverts = await fetchAdverts({
    throwsError: false,
    params: "?activeOnly=true",
  });
  if (adverts === "error" || !adverts) return null;

  return (
    <div>
      <AdsSlider ads={adverts.existingRecords} />
    </div>
  );
}

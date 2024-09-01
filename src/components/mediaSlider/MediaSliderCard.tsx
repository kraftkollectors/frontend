/* eslint-disable @next/next/no-img-element */
import { VideoOrImage } from "@/utils/types/basicTypes";

type MediaSliderCardProps = {
  onClick: () => void;
  src: string;
  active: boolean;
  type: VideoOrImage;
};

export default function MediaSliderCard({
  onClick,
  src,
  active,
  type
}: MediaSliderCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-28 aspect-[4/2.5] rounded bg-black-400 overflow-hidden hover:scale-90 ${active
        ? "opacity-1"
        : "opacity-50"}`}
    >
      {
        type === "image" ? 
        <img src={src} alt="slider item" className="w-full h-full object-cover" />
        : <video src={src} className="w-full h-full object-cover" />
      }
    </button>
  );
}

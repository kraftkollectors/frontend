import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { MediaSliderIndicatorProps } from "./MediaSliderIndicators";

export default function MediaSliderArrows({
  itemCount,
  currentIndex,
  onChange,
}: MediaSliderIndicatorProps) {
  return (
    <>
      <button
        title="previous slide"
        className="media-slider-arrow"
        onClick={() => {
          const prevIndex =
            currentIndex - 1 == 0 ? itemCount : currentIndex - 1;
          onChange(prevIndex);
        }}
      >
        <FaChevronLeft />
      </button>
      <button
        title="next slide"
        className="media-slider-arrow right-1 [left:unset!important]"
        onClick={() => {
          const nextIndex = currentIndex === itemCount ? 1 : currentIndex + 1;
          onChange(nextIndex);
        }}
      >
        <FaChevronRight />
      </button>
    </>
  );
}

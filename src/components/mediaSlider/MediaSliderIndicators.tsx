export type MediaSliderIndicatorProps = {
  itemCount: number;
  currentIndex: number;
  onChange: (value: number) => void;
};

export default function MediaSliderIndicators({
  itemCount,
  currentIndex,
  onChange,
}: MediaSliderIndicatorProps) {
  return (
    <div className="flex gap-2">
      {Array.from({ length: itemCount }, (_, i) => {
        return (
          <div
            key={i}
            onClick={() => onChange(i + 1)}
            className={`aspect-square size-3 rounded-full ${
              i + 1 === currentIndex
                ? "bg-light"
                : "bg-[#FFFFFF69] backdrop-blur-sm"
            }`}
          />
        );
      })}
    </div>
  );
}

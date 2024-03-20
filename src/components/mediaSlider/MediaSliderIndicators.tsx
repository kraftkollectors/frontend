export type MediaSliderIndicatorProps = {
  itemCount: number;
  currentIndex: number;
  onChange: (value: number) => void;
};

export default function MediaSliderIndicators({
  itemCount,
  currentIndex,
  onChange
}: MediaSliderIndicatorProps) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: itemCount }, (_, i) => {
        return (
          <button
            key={i}
            onClick={() => onChange(i + 1)}
            className={`size-2 aspect-square border rounded-full ${i + 1 ===
            currentIndex
              ? "bg-light"
              : "bg-[#00000055]"}`}
          />
        );
      })}
    </div>
  );
}

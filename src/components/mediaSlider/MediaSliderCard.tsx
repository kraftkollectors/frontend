type MediaSliderCardProps = {
  onClick: () => void;
  src: string;
  active: boolean;
};

export default function MediaSliderCard({
  onClick,
  src,
  active
}: MediaSliderCardProps) {
  return (
    <button
      onClick={onClick}
      className={`size-16 aspect-square rounded overflow-hidden hover:scale-90 ${active
        ? "opacity-1"
        : "opacity-50"}`}
    >
      <img src={src} alt="slider item" className="w-full h-full object-cover" />
    </button>
  );
}

"use client";

import { formatMedia } from "@/functions/media";
import MediaSliderCard from "./MediaSliderCard";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MediaSliderIndicators from "./MediaSliderIndicators";
import MediaSliderArrows from "./MediaSliderArrows";

export type MediaSliderProps = {
  media: string[];
};

export function MediaSlider({ media }: MediaSliderProps) {
  const files = formatMedia(media);

  const [index, setIndex] = useState(1);

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-black-900 md:rounded-md">
        <AnimatePresence>
          {files.map((file, i) => {
            const _index = i + 1;
            return (
              _index === index &&
              (file.type === "image" ? (
                <motion.img
                  key={i}
                  src={file.src}
                  alt={`Photo of product (${i + 1})`}
                  className="absolute h-full w-full bg-black-900 object-contain md:rounded-md"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.1, opacity: 0 }}
                />
              ) : (
                <motion.video
                  key={i}
                  src={file.src}
                  className="absolute h-full w-full bg-black-900 object-contain md:rounded-md"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.1, opacity: 0 }}
                  autoPlay
                  playsInline
                  loop
                  muted
                  controls
                />
              ))
            );
          })}
        </AnimatePresence>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 md:hidden">
          <MediaSliderIndicators
            currentIndex={index}
            onChange={(v) => setIndex(v)}
            itemCount={files.length}
          />
        </div>
        <div className="md:hidden">
          <MediaSliderArrows
            currentIndex={index}
            onChange={(v) => setIndex(v)}
            itemCount={files.length}
          />
        </div>
      </div>
      <div className="flex w-full gap-2 overflow-x-auto max-md:hidden">
        {files.map((file, i) => (
          <MediaSliderCard
            key={i}
            {...file}
            active={i + 1 === index}
            onClick={() => {
              setIndex(i + 1);
            }}
          />
        ))}
      </div>
    </div>
  );
}

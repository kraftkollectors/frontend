/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MediaSliderIndicators from "./MediaSliderIndicators";
import MediaSliderArrows from "./MediaSliderArrows";
import { Advert } from "@/utils/types/advert";

export type MediaSliderProps = {
  ads: Advert[];
};

export function AdsSlider({ ads }: MediaSliderProps) {
  const [index, setIndex] = useState(1);
  const int = useRef<any>(null);
  useEffect(()=>{
    if(int.current) clearInterval(int.current);
    int.current = setInterval(() => {
      if (index === ads.length) {
        setIndex(1);
      } else {
        setIndex((i) => i + 1);
      }
    }, 4000);
    return () => clearInterval(int.current);
  }, [index])

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-black-900">
        <AnimatePresence>
          {ads.map((ad, i) => {
            const _index = i + 1;
            return (
              _index === index && (
                <motion.a
                  href={ad.url}
                  target="_blank"
                  key={i}
                  style={{ backgroundImage: `url(${ad.image})` }}
                  className="absolute block h-full w-full overflow-hidden bg-black-900 bg-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="relative h-full w-full bg-[#00000088] backdrop-blur"></div>
                  <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center p-1">
                    <img
                      src={ad.image}
                      alt={"advertisement of " + ad.title}
                      className="h-full rounded object-contain shadow-lg"
                      height={700}
                      width={800}
                      loading="lazy"
                    />
                  </div>
                  <h3 className="absolute bottom-0 left-0 flex h-1/2 w-full flex-col items-start justify-end bg-gradient-to-t from-[#00000012] to-transparent p-6 pb-10 text-title font-bold text-light lg:text-headline">
                    <span>{ad.title}</span>
                  </h3>
                </motion.a>
              )
            );
          })}
        </AnimatePresence>
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
          <MediaSliderIndicators
            currentIndex={index}
            onChange={(v) => setIndex(v)}
            itemCount={ads.length}
          />
        </div>
        <div className="">
          <MediaSliderArrows
            currentIndex={index}
            onChange={(v) => setIndex(v)}
            itemCount={ads.length}
          />
        </div>
      </div>
    </div>
  );
}

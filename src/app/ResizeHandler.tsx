"use client";

import { useEffectOnce } from "react-use";

export default function ResizeHandler() {
  useEffectOnce(() => {
    if (!visualViewport) return;
    visualViewport.addEventListener("resize", (e) => {
      const h = visualViewport?.height;
      document.body.style.maxHeight = `${h}px`;
      document.documentElement.style.maxHeight = `${h}px`;
      //   alert(`${h}px`);
    });
  });

  return <></>;
}

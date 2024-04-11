"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";


export function useWindowWidth() {
  const pathname = usePathname();
  const [windowWidth, setWindowWidth] = useState<number|null>(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window?.innerWidth);
    };

    // Initial window width
    setWindowWidth(window?.innerWidth);

    // Add event listener for window resize
    window?.addEventListener("resize", handleResize);

    // Cleanup: Remove event listener on component unmount
    return () => {
      window?.removeEventListener("resize", handleResize);
    };
  }, [pathname]); // Empty dependency array to run the effect only once on mount

  return windowWidth as number;
}

export default useWindowWidth;

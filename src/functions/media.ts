import { ServiceMedia } from "@/utils/types/basicTypes";

export function formatMedia(media: string[]): ServiceMedia[] {
  const videoFormats = ["mp4", "mkv", "webm"];
  return media.map(src => {
    const segments = src.split(".");
    const ext = segments[segments.length - 1].toLowerCase();
    return {
      src,
      type: videoFormats.includes(ext) ? "video" : "image"
    };
  });
}

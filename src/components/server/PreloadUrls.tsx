import Link from "next/link";

export default function PreloadUrls({ urls }: { urls: string[] }) {
  return urls.map((url, i) => (
    <Link
      key={i}
      aria-hidden
      href={url}
      title={`preload ${url}`}
      rel="nofollow"
      className="invisible hidden"
    />
  ));
}

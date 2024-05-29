import Link from "next/link";
import Image from 'next/image';

export function AppLogo() {
  return (
    <Link href="/">
      <img height={45} width={144} src='/images/logo.png' alt="Logo" className="w-28 lg:w-36 aspect-[144/45]" />
    </Link>
  );
}

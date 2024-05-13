import Link from "next/link";
import Image from 'next/image';

export function AppLogo() {
  return (
    <Link href="/">
      <Image height={200} width={400} src='/images/logo.png' alt="Logo" className="w-28 lg:w-36" />
    </Link>
  );
}

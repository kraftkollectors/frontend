import Link from "next/link";
import Image from 'next/image';

export function AppLogo() {
  return (
    <Link href="/">
      <Image height={100} width={200} src='/images/logo.svg' alt="Logo" className="w-28 lg:w-36" />
    </Link>
  );
}

import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="app-container bg-dark-footer text-light p-4 flex flex-col gap-6">
      <p className="text-headline">KraftKollectors</p>
      <div className="md:grid grid-cols-8">
        <div className="grid gap-5 grid-cols-2 md:grid-cols-3 md:col-span-5">
          <div className="flex flex-col gap-2">
            <h2 className="font-bold">Categories</h2>
            {categories.map((category) => (
              <Link
                className="hover-link"
                key={category.href}
                href={category.href}
              >
                {category.title}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="font-bold">Quick links</h2>
            {quicklinks.map((quicklink) => (
              <Link
                className="hover-link"
                key={quicklink.href}
                href={quicklink.href}
              >
                {quicklink.title}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="font-bold">Download</h2>
            {downloads.map((download) => (
              <Link
                className="hover-link"
                key={download.href}
                href={download.href}
              >
                {download.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex max-md:justify-center gap-2 md:col-span-3 max-md:pt-8">
          <p className="font-bold max-md:hidden">Get in touch</p>
          {socials.map((social) => (
            <Link
              className="text-2xl hover-link"
              href={social.href}
              key={social.href}
            >
              {social.icon}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

const categories = [
  { title: "Category 1", href: "/" },
  { title: "Category 2", href: "/" },
  { title: "Category 3", href: "/" },
  { title: "Category 4", href: "/" },
];
const quicklinks = [
  { title: "Contact us", href: "/" },
  { title: "Terms & conditions", href: "/" },
  { title: "Privacy policy", href: "/" },
  { title: "Become an artisan", href: "/" },
];

const downloads = [
  {
    title: "Android app",
    href: "/",
  },
  {
    title: "IOS app",
    href: "/",
  },
];

const socials = [
  { icon: <FaXTwitter />, href: "" },
  { icon: <FaInstagram />, href: "" },
  { icon: <FaFacebookF />, href: "" },
  { icon: <FaLinkedinIn />, href: "" },
  { icon: <FaTiktok />, href: "" },
];

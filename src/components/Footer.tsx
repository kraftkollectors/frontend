import { paths } from "@/utils";
import Link from "next/link";
import { AppLogo } from "./ui/AppLogo";
import ThisYear from "./ui/ThisYear";

export default function Footer() {
  return (
    <footer className="app-container flex flex-col gap-6 border-t border-black-50 bg-light py-16 text-black-500">
      <div className="flex gap-6 max-md:flex-col md:gap-12">
        <div>
          <AppLogo />
        </div>
        <div className="flex grid-cols-3 flex-col gap-4 md:grid md:gap-12 lg:grid-cols-4 xl:gap-16">
          {links.map((link) => (
            <div key={link.title} className="flex flex-col items-start gap-4">
              <h3 className="text-body font-semibold">{link.title}</h3>
              {link.links.map((link, i) => (
                <Link
                  className="text-black-500 hover:underline"
                  key={link.href + i}
                  href={link.href}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
      <p className="pt-10 text-center font-semibold text-black-400">
        &copy; <ThisYear /> Kraftkollectors. All rights reserved.
      </p>
    </footer>
  );
}

const links = [
  {
    title: "Categories",
    links: [
      { title: "Home services", href: "/" },
      { title: "Beauty and welness", href: "/" },
      { title: "Business services", href: "/" },
      { title: "Cleaning services", href: "/" },
      { title: "Fashion and styling", href: "/" },
    ],
  },
  {
    title: "Quick Links",
    links: [
      { title: "Contact us", href: paths.support },
      { title: "Terms & conditions", href: paths.termsAndConditions },
      { title: "Privacy policy", href: paths.termsAndConditions },
      { title: "Become an artisan", href: paths.becomeASeller },
    ],
  },
  {
    title: "Socials",
    links: [
      { title: "Instagram", href: paths.instagram },
      { title: "Facebook", href: paths.facebook },
      { title: "Twitter X", href: paths.twitter },
      // { title: "Become an artisan", href: paths.becomeASeller },
    ],
  },
  {
    title: "Download",
    links: [
      { title: "Play Store", href: paths.android },
      { title: "App Store", href: paths.ios },
    ],
  },
];

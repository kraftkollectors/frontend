import { paths } from "@/utils";
import Link from "next/link";
import { AppLogo } from "./ui/AppLogo";
import ThisYear from "./ui/ThisYear";

export default function Footer() {
  return (
    <footer className="app-container bg-light text-black-500 border-t border-black-50 py-16 flex flex-col gap-6">
      <div className="flex max-md:flex-col gap-6 md:gap-12">

        <div>
          <AppLogo />
        </div>
        <div className="flex flex-col gap-4 md:grid grid-cols-3 lg:grid-cols-4 md:gap-12 xl:gap-16">
          {
            links.map((link) => (
              <div key={link.title} className="flex flex-col gap-4 items-start">
                <h3 className="font-semibold text-body">{link.title}</h3>
                {
                  link.links.map((link, i) => (
                    <Link
                      className="text-black-400 hover:underline"
                      key={link.href + i}
                      href={link.href}
                    >
                      {link.title}
                    </Link>
                  ))
                }
              </div>
            ))
          }

        </div>
      </div>
      <p className="pt-10 text-center text-black-200 font-semibold">
        &copy; <ThisYear /> Kraftkollectors. All rights reserved.
      </p>
    </footer>
  );
}

const links = [
  {
    title: 'Categories',
    links: [
      { title: "Home services", href: "/" },
      { title: "Beauty and welness", href: "/" },
      { title: "Business services", href: "/" },
      { title: "Cleaning services", href: "/" },
      { title: "Fashion and styling", href: "/" },
    ]
  },
  {
    title: 'Quick Links',
    links: [
      { title: "Contact us", href: paths.support },
      { title: "Terms & conditions", href: paths.termsAndConditions },
      { title: "Privacy policy", href: paths.termsAndConditions },
      { title: "Become an artisan", href: paths.becomeASeller },
    ]
  },
  {
    title: 'Socials',
    links: [
      { title: "Instagram", href: paths.instagram },
      { title: "Facebook", href: paths.facebook },
      { title: "Twitter X", href: paths.twitter },
      // { title: "Become an artisan", href: paths.becomeASeller },
    ]
  },
  {
    title: 'Download',
    links: [
      { title: "Play Store", href: paths.android, },
      { title: "App Store", href: paths.ios, },
    ]
  },
]

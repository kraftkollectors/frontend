/* eslint-disable @next/next/no-img-element */
import { paths } from "@/utils";
import Image from "next/image";
import Link from "next/link";
export default function Banner() {
  return (
    <section className="app-container py-16">
      <div className="grid overflow-hidden rounded-2xl md:grid-cols-2">
        <div className="app-container flex flex-col justify-center gap-4 bg-primary-darkActive py-10 text-light max-md:text-center">
          <p className="text-headline font-bold">
            Ready to Elevate Your Kraft and Skill?
          </p>
          <p>
            Connect with nearby artisans and service providers with our
            intuitive geolocation feature. Download our app now and connect with
            skilled artisans and service providers on the go.
          </p>
          <Link
            href={paths.becomeASeller}
            className="btn-light w-fit px-6 max-sm:w-full"
          >
            Become an artisan
          </Link>
        </div>
        <div className="relative h-full w-full">
          <img
            src="/images/banner.jpeg"
            alt=""
            width={600}
            height={600}
            className="h-full w-full object-cover"
          />
          <div className="absolute left-0 top-0 h-full w-full bg-primary-darkActive bg-opacity-[0.75]"></div>
        </div>
      </div>
    </section>
  );
}

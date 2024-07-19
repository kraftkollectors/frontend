import { paths } from "@/utils";
import Image from "next/image";
import Link from "next/link";
export default function Banner() {
  return (
    <section className="app-container py-16">
      <div className=" grid md:grid-cols-2 rounded-2xl overflow-hidden">
        <div className="bg-primary-darkActive app-container py-10 max-md:text-center flex flex-col gap-4 text-light justify-center ">
          <p className="text-headline font-bold ">
            Ready to Elevate Your Kraft and Skill?
          </p>
          <p>
            Connect with nearby artisans and service providers with our
            intuitive geolocation feature. Download our app now and connect with
            skilled artisans and service providers on the go.
          </p>
          <Link href={paths.becomeASeller} className="max-sm:w-full btn-light w-fit px-6">
            Become an artisan
          </Link>
        </div>
        <div className="w-full h-full relative">
          <Image
            src="/images/hero-bg.jpeg"
            alt=""
            width={600}
            height={600}
            className="w-full h-full object-cover"
          />
          <div className="absolute w-full h-full top-0 left-0 bg-primary-darkActive bg-opacity-[0.75]"></div>
        </div>
      </div>
    </section>
  );
}

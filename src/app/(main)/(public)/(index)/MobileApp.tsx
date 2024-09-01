import { paths } from "@/utils";
import Image from "next/image";
import Link from "next/link";

export default function MobileApp() {
  return (
    <div className="bg-primary-lightActive2">
      <div className="app-container py-16">
        <div className="flex flex-col-reverse gap-6 md:grid md:grid-cols-2 md:gap-12">
          <div className="grid w-full place-items-center">
            <div className="relative aspect-square w-full max-w-[503px]">
              <Image
                src="/images/circle.png"
                alt="circle"
                width={200}
                height={200}
                loading="lazy"
                className="absolute left-1/2 top-1/2 aspect-square w-full -translate-x-1/2 -translate-y-1/2"
              />
              <Image
                src="/images/phone.png"
                alt="phone"
                width={200}
                height={200}
                loading="lazy"
                className="absolute left-1/2 top-1/2 size-full -translate-x-1/2 -translate-y-1/2 object-contain"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center gap-2 max-md:items-center max-md:text-center">
            <h3 className="text-start text-title font-bold">
              Download our App
            </h3>
            <p className="text-headline font-bold text-primary">
              Experience Seamless Service Connections Anytime, Anywhere!
            </p>
            <p>
              Connect with nearby artisans and service providers with our
              intuitive geolocation feature. Download our app now and connect
              with skilled artisans and service providers on the go.
            </p>
            <div className="flex gap-2">
              <Link href={paths.android}>
                <Image
                  src="/images/playstore.svg"
                  alt="playstore"
                  width={152}
                  height={50}
                  className="w-36"
                />
              </Link>
              <Link href={paths.ios}>
                <Image
                  src={"/images/appstore.svg"}
                  alt="appstore"
                  width={152}
                  height={50}
                  className="w-36"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

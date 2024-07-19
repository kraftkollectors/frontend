import Image from "next/image";

export default function MobileApp() {
  return (
    <div className=" bg-primary-lightActive2">
      <div className="app-container py-16">
        <div className="flex flex-col-reverse gap-6 md:grid md:grid-cols-2 md:gap-12">
          <div className="grid place-items-center w-full">
          <div className="relative aspect-square w-full max-w-[503px]">
            <Image
              src="/images/circle.png"
              alt="circle"
              width={200}
              height={200}
              className=" top-1/2 left-1/2 w-full aspect-square absolute -translate-x-1/2 -translate-y-1/2"
              priority={true}
            />
            <Image
              src="/images/phone.png"
              alt="phone"
              width={200}
              height={200}
              className="absolute top-1/2 left-1/2 object-contain size-full  -translate-x-1/2 -translate-y-1/2"
              priority={true}
            />
          </div>
          </div>

          <div className="flex flex-col gap-2 justify-center max-md:items-center max-md:text-center">
            <h3 className=" text-title font-bold text-start">Download our App</h3>
            <p className=" text-primary text-headline font-bold">Experience Seamless Service
            Connections Anytime, Anywhere!</p>
            <p>Connect with nearby artisans and service providers with our intuitive geolocation feature. Download our app now and connect with skilled artisans and service providers on the go.</p>
            <div className="flex gap-2">
                <Image src="/images/playstore.svg" alt="playstore" width={152} height={152} className="w-36"/>
                <Image src={"/images/appstore.svg"} alt="appstore" width={152} height={152} className="w-36"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

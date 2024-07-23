import Hero from "./Hero";
import MobileApp from "./MobileApp";
import Banner from "./Banner";
import FeaturedServices from "./FeaturedServices";

export default function Home() {
  return (
    <>
      <Hero />
      {/* <AllCategories /> */}
      <FeaturedServices />
      <MobileApp />
      <Banner />
    </>
  );
}

import Hero from "./Hero";
import MobileApp from "./MobileApp";
import Banner from "./Banner";
import FeaturedServices from "./FeaturedServices";
import AllCategories from "./AllCategories";

export default function Home() {
  return (
    <>
      <Hero />
      <AllCategories />
      <FeaturedServices />
      <MobileApp />
      <Banner />
    </>
  );
}

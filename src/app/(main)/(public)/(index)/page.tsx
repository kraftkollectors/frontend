import Hero from "./Hero";
import MobileApp from "./MobileApp";
import Banner from "./Banner";
import FeaturedServices from "./FeaturedServices";
import AllCategories from "./AllCategories";
import FeaturedArtisans from "./FeaturedArtisans";
// import PreloadResources from 'react-dom';

export default function Home() {
  return (
    <>
      <Hero />
      <AllCategories />
      <FeaturedArtisans />
      <FeaturedServices />
      <MobileApp />
      <Banner />
    </>
  );
}

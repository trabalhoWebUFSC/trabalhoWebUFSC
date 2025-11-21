import HeroHotel from "../../components/HeroHotel/HeroHotel";
import RoomChoice from "../../components/RoomChoice/RoomChoice";
import PromoBanner from "../../components/PromoBanner/PromoBanner";
import Rating from "../../components/Rating/Rating";
import NewsSection from "../../components/NewsSection/NewsSection";
import Services from "../../components/Services/Services";

function Home() {
  return (
    <>
      <HeroHotel />
      <div id="rooms">
        <RoomChoice />
      </div>
      
      <div id="services">
       <Services />
      </div>
      <Rating />
      <NewsSection />
      <PromoBanner />
    </>
  );
}

export default Home;


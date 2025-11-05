import HeroHotel from "../../components/HeroHotel/HeroHotel";
import RoomChoice from "../../components/RoomChoice/RoomChoice";
import PromoBanner from "../../components/PromoBanner/PromoBanner";
import Rating from "../../components/Rating/Rating";

function Home() {
  return (
    <>
      <HeroHotel />
      <div id="services">
        <RoomChoice />
      </div>

      <Rating />
      <PromoBanner />
    </>
  );
}

export default Home;

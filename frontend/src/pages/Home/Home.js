import HeroHotel from "../../components/HeroHotel/HeroHotel";
import RoomChoice from "../../components/RoomChoice/RoomChoice";
import PromoBanner from "../../components/PromoBanner/PromoBanner";

function Home() {
  return (
    <>
      <HeroHotel />
      <div id="services">
        <RoomChoice />
      </div>

      <PromoBanner />
    </>
  );
}

export default Home;

import { useDispatch, useSelector } from "react-redux";
import HomeSearch from "../components/HomeSearch";
import Hero from "../components/shared/Hero";
import { getVenues } from "../store/modules/VenueSlice";
import { useEffect, React } from "react";
import CountryList from "../components/CountryList";
import ShortAbout from "../components/homepage/ShortAbout";
import TopVenues from "../components/homepage/TopVenues";

const Homepage = () => {
  return (
    <>
      <Hero
        img={"/beach_hero.jpg"}
        text={"Ready for your next adventure?"}
        className={"h-[600px] bottom-5 text-[52px] z-0 absolute"}
      />
      <HomeSearch className={"z-20"} />
      {/* Skal gi ut input på submit, sendes til ny side og sender med inputdataene */}
      <ShortAbout />
      <TopVenues></TopVenues>
    </>
  );
};

export default Homepage;

import { useDispatch, useSelector } from "react-redux";
import HomeSearch from "../components/HomeSearch";
import Hero from "../components/shared/Hero";
import { getVenues } from "../store/modules/VenueSlice";
import { useEffect, React } from "react";
import CountryList from "../components/CountryList";
import ShortAbout from "../components/homepage/ShortAbout";
import TopVenues from "../components/homepage/TopVenues";
import { useNavigate } from "react-router-dom";

const Homepage = () => {

  const navigate = useNavigate()

  function nextPageSub (data) {
    console.log(data)
  navigate("/venues", {
    state: {
     search: data
    },
  });
}

const initialValues = {
  dateFrom: new Date(),
    dateTo: new Date(Date.now() + ( 3600 * 1000 * 24)),
    guests: 1
}

 
 
  return (
    <>
      <Hero
        img={"/beach_hero.jpg"}
        className={"h-[600px] bottom-5 text-[52px] z-0 absolute"}
      />
      <HomeSearch className={"z-20 calendar-home"}  onSubmit={nextPageSub} initialValues={initialValues} />
      {/* Skal gi ut input på submit, sendes til ny side og sender med inputdataene */}
      <ShortAbout />
  
    </>
  );
};

export default Homepage;

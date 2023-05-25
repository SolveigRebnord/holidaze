import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVenues } from "../../store/modules/VenueSlice";
import { Link } from "react-router-dom";
import Slider from "../shared/Slider";
import { useMediaQuery } from 'react-responsive';



const TopVenues = () => {

    const dispatch = useDispatch();
    const { venues } = useSelector((state) => state.venues);
  
    useEffect(() => {
      dispatch(getVenues());
    }, [dispatch]);

    const firstThree = venues.slice(0, 3);
  

    const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

    return ( 
        <>
        <h2 className="my-20 text-center">Our top venues at the moment</h2>
     
            {isMobile && <Slider site={'home'} media={firstThree} />}
            {!isMobile && 
                <section className="w-2/3 mx-auto flex flex-col gap-12">
            {firstThree.map((venue, index) => (
      <div
               key={index}
               className="h-full w-full"
             >
               <div
        className="flex flex-col gap-2 p-1 border border-black w-full md:flex-row-reverse md:justify-between lg:w-2/3 mx-auto"
        key={venue.id}
      >
        <div className="w-full h-52 md:w-1/2 md:h-96">
          <img
            src={venue.media}
            alt={venue.name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/no_image.png";
            }}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 md:p-6 flex flex-col justify-between md:w-1/2">
          <div className="mt-2 flex flex-col items-start gap-2">
            <h3 className="font-passionOne uppercase text-2xl tracking-wide">
              {" "}
              <Link to={`/venues/${venue.id}`}>{venue.name}</Link>
            </h3>
            <div className="flexR justify-normal gap-2 font-semibold">
              <img src="/map_pin.svg" className="w-6" />
              <p>{venue.location.city}</p>
            </div>
            <div className="flexR justify-normal gap-2 font-semibold">
              <img src="/guests.svg" className="w-6" />
              <p>Max {venue.maxGuests} guests</p>
            </div>
          </div>
          <div className="flexR w-2/3 mx-auto my-8 md:mx-0 md:my-4">
            <span className="flex flex-col items-center ">
              {venue.meta.wifi ? (
                <p className="text-[#618F92]">&#x2713;</p>
              ) : (
                <p className="text-[#C00D63]">&#x2717;</p>
              )}
              <img src="/wifi.svg" className="w-6" />
            </span>
            <span className="flex flex-col items-center ">
              {venue.meta.pets ? (
                <p className="text-[#618F92]">&#x2713;</p>
              ) : (
                <p className="text-[#C00D63]">&#x2717;</p>
              )}
              <img src="/animals.svg" className="w-6" />
            </span>
            <span className="flex flex-col items-center ">
              {venue.meta.breakfast ? (
                <p className="text-[#618F92]">&#x2713;</p>
              ) : (
                <p className="text-[#C00D63]">&#x2717;</p>
              )}
              <img src="/breakfast.svg" className="w-6" />
            </span>
            <span className="flex flex-col items-center ">
              {venue.meta.parking ? (
                <p className="text-[#618F92]">&#x2713;</p>
              ) : (
                <p className="text-[#C00D63]">&#x2717;</p>
              )}
              <img src="/car.svg" className="w-6" />
            </span>
          </div>
          <hr className="hidden md:block bg-black shadow-none border-none h-0.5 mb-2" />
          <div className="flex flex-row justify-between items-center md:flex-col-reverse md:gap-4 md:items-start">
            <button className="bg-lightBeige text-purpleBlack px-4 w-fit font-semibold h-14 text-sm shadow-md drop-shadow-md md:px-6 md:h-12">
              Check available dates
            </button>
            <span className="flex flex-col items-end md:flex-row md:justify-between md:gap-4 md:items-baseline">
              <p className="uppercase text-xs text-gray-500 font-montS font-semibold tracking-wide">
                Price per night
              </p>
              <p className="font-passionOne font-normal tracking-wide text-2xl">
                {venue.price} NOK
              </p>
            </span>
          </div>
        </div>
      </div>
             </div>
             
             
  )
  )}          </section>
}
       
       
</>);
}
 
export default TopVenues;
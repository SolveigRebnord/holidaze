import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleVenue } from "../store/modules/VenueSlice";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Slider from '../components/shared/Slider'
import Hero from "../components/shared/Hero";

const OneVenue = () => {
  const dispatch = useDispatch();
  const { singleVenue } = useSelector((state) => state.venues);
  let { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getSingleVenue(id));
    }
  }, [dispatch, id]);

  return (
    <>
      {singleVenue && (
        <section className="">
          <Hero img={"/plants.jpg"} text={singleVenue.name}></Hero>
          <section className="flex flex-col lg:flex-row justify-center lg:gap-20 lg:p-20 lg:px-32">
               {/* One Venue component */}
            <div className="lg:w-1/2">
              <div>
                <Slider media={singleVenue.media}></Slider>
              </div>
              <div className="w-full px-6 md:w-3/4 md:p-0 mx-auto flex flex-col gap-8 my-12">
                <div className="md:flex flex-row items-center justify-between">
                  <div className="flex flex-col gap-4">
                    <span className="flex flex-row gap-2">
                      <img src="/map_pin.svg" />
                      {singleVenue.location && (
                        <p>
                          {singleVenue.location.city},{" "}
                          {singleVenue.location.zip},{" "}
                          {singleVenue.location.country}
                        </p>
                      )}
                    </span>
                    <span className="flex flex-row gap-2">
                      <img src="/guests.svg" />
                      <p>
                        <span>Max </span>
                        {singleVenue.maxGuests} guests{" "}
                      </p>
                    </span>
                  </div>
                  <div>
                    <span className="flex flex-col items-end  ">
                      <p className="uppercase text-xs text-gray-500 font-montS font-semibold tracking-wide">
                        Price per night
                      </p>
                      <p className="font-passionOne font-normal tracking-wide text-2xl">
                        {singleVenue.price} NOK
                      </p>
                    </span>
                  </div>
                </div>
                <hr className=" bg-black shadow-none border-none h-0.5 mb-2" />
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="bg-gray-200 w-full text-sm p-6">
                      {singleVenue.description}
                    </p>
                  </div>
                  <div className="flexR w-2/3 mx-auto my-8 ">
                    <span className="flex flex-col items-center gap-1">
                      {singleVenue.meta.wifi ? (
                        <p className="text-[#618F92]">&#x2713;</p>
                      ) : (
                        <p className="text-[#C00D63]">&#x2717;</p>
                      )}
                      <img src="/wifi.svg" className="w-6" />
                      <p className="text-gray-500 uppercase text-xs">Wifi</p>
                    </span>
                    <span className="flex flex-col items-center gap-1">
                      {singleVenue.meta.breakfast ? (
                        <p className="text-[#618F92]">&#x2713;</p>
                      ) : (
                        <p className="text-[#C00D63]">&#x2717;</p>
                      )}
                      <img src="/breakfast.svg" className="w-6" />
                      <p className="text-gray-500 uppercase text-xs">
                        Breakfast
                      </p>
                    </span>
                    <span className="flex flex-col items-center gap-1">
                      {singleVenue.meta.pets ? (
                        <p className="text-[#618F92]">&#x2713;</p>
                      ) : (
                        <p className="text-[#C00D63]">&#x2717;</p>
                      )}
                      <img src="/animals.svg" className="w-6" />
                      <p className="text-gray-500 uppercase text-xs">Pets</p>
                    </span>
                    <span className="flex flex-col items-center gap-1">
                      {singleVenue.meta.parking ? (
                        <p className="text-[#618F92]">&#x2713;</p>
                      ) : (
                        <p className="text-[#C00D63]">&#x2717;</p>
                      )}
                      <img src="/car.svg" className="w-6" />
                      <p className="text-gray-500 uppercase text-xs">Parking</p>
                    </span>
                  </div>
                </div>
                <hr className=" bg-black shadow-none border-none h-0.5 mb-2" />

                <div className="w-full h-80 mx-auto">
                  <iframe
                    src={`https://www.google.com/maps/embed/v1/search?key=AIzaSyCMAO_LzHFtPi1_p2JGFVQR-YS4oIisowU&q=$${singleVenue.location.address}+in+${singleVenue.location.city}+in+${singleVenue.location.country}`}
                    allowFullScreen={true}
                    loading={"lazy"}
                    referrerPolicy={"no-referrer-when-downgrade"}
                    className="w-full h-full object-cover"
                  ></iframe>
                </div>
              </div>
            </div>

              {/* Booking component */}
            <section className=" md:px-32 lg:w-1/3 h-fit py-12  bg-purpleBlack p-6 md:py-20 lg:py-12 lg:px-6 flex flex-col gap-4">
              <div>
                <div className="uppercase">
                  <h2 className="text-white font-semibold text-xl tracking-wide font-passionOne ">
                    Booking
                  </h2>
                </div>
              </div>
                {/* Search ish component */}
              <form className=" p-2 font-montS text-sm text-black flex flex-col gap-6">
                <div className="flex flex-row justify-between items-center">
                  <input
                    className="w-1/2 bg-white h-12 px-2"
                    placeholder="24.april-25.april"
                  ></input>
                  <input
                    className="w-1/2 text-right bg-white h-12 px-2"
                    placeholder="1 night"
                  ></input>
                </div>
                <input
                  className="p-2 w-full text-right h-12"
                  placeholder="2 guests"
                ></input>
              </form>
              <div>
                <span className="flex flex-col items-end text-white">
                  <p className="uppercase text-passionOrange text-xs font-montS font-semibold tracking-wide">
                    Price per night
                  </p>
                  <p className="font-montS font-semibold tracking-wide text-normal ">
                    {singleVenue.price} NOK
                  </p>
                </span>
                <hr className=" bg-white shadow-none border-none h-0.5 my-6" />
                <span className="flex flex-col items-end text-white">
                  <p className=" text-xs font-montS font-semibold tracking-wide">
                    incl. taxes
                  </p>
                  <p className="uppercase text-passionOrange text-sm font-montS font-semibold tracking-wide">
                    Total price
                  </p>
                  <p className="font-passionOne font-semibold tracking-wider text-3xl ">
                    {singleVenue.price} NOK
                  </p>
                </span>
                <hr className=" bg-white shadow-none border-none h-0.5 my-6" />
                <button className="ml-auto block bg-passionOrange uppercase text-purpleBlack px-12 w-fit font-semibold h-12 text-sm shadow-md drop-shadow-md">
                  Book
                </button>
              </div>
            </section>
            {/* If true, Display booking details overlay component. Return og confirm knapper. Confirm går til profile og viser din nylige booking. */}
          </section>
        </section>
      )}
    </>
  );
};

export default OneVenue;

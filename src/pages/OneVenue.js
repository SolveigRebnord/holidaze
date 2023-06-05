import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleVenue } from "../store/modules/VenueSlice";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Slider from "../components/shared/Slider";
import Hero from "../components/shared/Hero";
import BookingForm from "../components/BookingForm";

const OneVenue = () => {
  const dispatch = useDispatch();
  const { singleVenue } = useSelector((state) => state.venues);
  let { id } = useParams();
  let { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (id) {
      dispatch(getSingleVenue(id));
    }
  }, [dispatch, id]);

  return (
    <>
      {singleVenue && (
        <section className="">
          <Hero img={"/sand.jpg"} text={singleVenue.name}></Hero>
          <section className="flex flex-col lg:flex-row justify-center lg:gap-20 lg:p-20 lg:px-32 mt-20">
            {/* One Venue component */}
            <div className="md:w-2/3 mx-auto lg:w-1/2">
              <div>
                <Slider media={singleVenue.media} site={"venue"}></Slider>
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

            
            {user ? 
            <section className=" md:px-32 lg:w-1/3 h-fit py-12  bg-purpleBlack p-6 md:py-20 lg:py-12 lg:px-6 flex flex-col gap-4">
              <div>
                <div className="uppercase">
                  <h2 className="text-white font-semibold text-xl tracking-wide font-passionOne ">
                    Booking
                  </h2>
                </div>
              </div>
              <BookingForm venue={singleVenue} />
            </section>
            : 
            <section className="w-full mb-12 h-52 bg-purpleBlack text-white flex justify-center items-center gap-4 flex-col">
               <p>To make a booking or rent out your venue </p>
              <Link to={'/login'} preventScrollReset={false} className="underline underline-offset-4">
                Log in or create your account today
                </Link>
              </section>

            }
          </section>
        </section>
      )}
    </>
  );
};

export default OneVenue;

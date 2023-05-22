import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { getSingleProfile } from "../store/modules/ProfilesSlice";
import { getFilteredBookings } from "../store/modules/BookingSlice";
import FadeIn from "react-fade-in/lib/FadeIn";
import { useState } from "react";
import React from "react";
import Menu from "../components/Menu";
import { useRef } from "react";
import Slider from '../components/shared/Slider'

const Account = () => {
  const dispatch = useDispatch();

  const { user: currentUser } = useSelector((state) => state.auth);
  const { singleProfile } = useSelector((state) => state.profiles);

  const dayjs = require('dayjs')
  dayjs().format('DD/MM/YYYY')
  

  if (!currentUser) {
    window.location.replace("/login");
  }

  let name = currentUser.name;

  const myRef = useRef(null)

  const ref2 = useRef(null)

  const ref1 = useRef(null)

  const [activeIndex, setActiveIndex] = useState(0);
  const [active, setActive] = useState(null);
  const menuItems = [{title: 'Upcoming Bookings', id: 1}, {title: 'Your venues', id: 2}, {title: 'Add new venue', id: 3}];


  function handleClick(id) {
    let number = id.target.id;
    if (number === activeIndex) {
      setActiveIndex(0);
      setActive(0);
    } 
    else {
      setActiveIndex(number);
      setActive(number);
      executeScroll(number);
    }
  }

  const executeScroll = (id) => {
    let secRef = `ref${id}`
    myRef.current.scrollIntoView({behavior: "smooth", block: "start"})    
  }


  useEffect(() => {
    if (name) {
      dispatch(getSingleProfile(name));
    }
  }, [dispatch, name]);

  function FadeInSection(props) {
    const [isVisible, setVisible] = React.useState(true);
    const domRef = React.useRef();
    React.useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          setVisible(entry.isIntersecting);
        });
      });

      const { current } = domRef;
      observer.observe(current);

      return () => observer.unobserve(current);
    }, []);
    return (
      <section
        className={`fade-in-section ${isVisible ? "is-visible" : ""}`}
        ref={domRef}
      >
        {props.children}
      </section>
    );
  }

  const timeDiff = (startDate, endDate) => {

  let start = dayjs(startDate)
  let end = dayjs(endDate)
  let diff = end.diff(start, 'day') 
  return diff;

  }

  return (
    <>
        {/* Hero */}
      <section className="relative z-0 mb-96 ">
        <img
          src="/palmtree.jpg"
          className="h-[550px] md:h-[300px] md:min-w-full object-cover object-left"
        ></img>
      </section>

      {singleProfile && (
        <>
            {/* Profile Info component */}
          <section className="absolute top-52 left-1/2 -translate-x-1/2 w-full  lg:w-1/2 flex flex-col-reverse md:flex-row items-center justify-center md:gap-32">
            <FadeIn delay={400}>
              <ul className=" flex flex-col gap-8 items-center text-sm pt-12 font-montS w-52">
              {menuItems.map((item) => (
                <FadeIn delay={600}>
                {item.id === 3 ?  <li
                  className={'cursor-pointer p-4 w-40 mx-auto flex flex-row items-center justify-center gap-2 text-center border border-purpleBlack'}
                  id={item.id} 
                  key={item.id}   
                  onClick={(id) => {handleClick(id)}}>
                  
                  <span className="flex flex-col justify-center">
                    <span>+</span> 
                    {item.title}
                  </span>
                </li> :
                <li
                  className={`cursor-pointer p-4 w-64 mx-auto flex flex-row items-center justify-center gap-2 text-center ${active == item.id && 'm-active'}`}
                  id={item.id} 
                  key={item.id}   
                  onClick={(id) => {handleClick(id)}}>
                  
                    {item.title} 
                    {item.id === 1 && <span>( {singleProfile.bookings.length} )</span> } 
                    {item.id === 2 && <span>( {singleProfile.venues.length} )</span> }
                    {item.id === 3 && <span>+</span> }
                </li> }
              </FadeIn>
              ))}
              </ul>
            </FadeIn>
            <FadeIn delay={200}>
              <div className="bg-white flex flex-col gap-4 px-10 py-12 w-fit shadow-xl drop-shadow-md relative">
                <div className="text-right ">
                  <button className="absolute top-4 right-4 ">
                    <img src="/gear.svg" />
                  </button>
                </div>
                <FadeIn transitionDuration={1000}>
                  <div className="flex flex-row gap-8 items-end">
                    {name ? (
                      <h1 className="font-semibold text-xl">
                        <span className="text-sm">Hi,</span> {name}!
                      </h1>
                    ) : (
                      <h1>Hi there!</h1>
                    )}
                    <img
                      src={singleProfile.avatar}
                      alt={singleProfile.name}
                      className="h-24 w-24 object-cover object-center rounded-full"
                    />
                  </div>
                </FadeIn>
                <div className="flex flex-col gap-4">
                  <hr className=" bg-gray-300 shadow-none border-none h-[1px] mt-10" />
                  <span className="flex flex-col items-end text-sm">
                    <p className="text-xs text-gray-500 uppercase unde">
                      Email
                    </p>
                    <p className="underline">{singleProfile.email}</p>
                  </span>
                  <hr className=" bg-gray-300 shadow-none border-none h-[1px]" />
                  <span className="flex flex-row justify-end text-sm gap-2">
                    <p className="text-sm">Venuemanager</p>
                    <span className="text-base font-semibold text-black">
                      {singleProfile.venueManager ? (
                        <span>&#10003;</span>
                      ) : (
                        <span>&#215;</span>
                      )}
                    </span>
                  </span>
                  <hr className=" bg-gray-300 shadow-none border-none h-[1px]" />
                </div>
              </div>
            </FadeIn>
          </section>

          <div ref={myRef} className=" block"></div>
          <Menu 
          title="Upcoming bookings" 
          isActive={activeIndex == 1}
          amount={singleProfile.bookings.length}
          >
            <section className="w-full px-4 pt-10 md:px-8">
              {/* My bookings component */}
              <div>
                {singleProfile.bookings.map((booking) => (
                  <div
                    className="flex flex-col gap-2 p-1 border border-black w-full md:flex-row-reverse md:justify-between lg:w-2/3 mx-auto"
                    key={booking.id}
                  >
                  <div className="w-full h-52 md:w-1/2 md:h-96">
                    <img
                            src={booking.venue.media}
                            alt={booking.id}
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
                              {booking.venue.name}
                           
                            </h3>
                            <div className="flexR justify-normal gap-2 font-semibold">
                              <img src="/map_pin.svg" className="w-6" />
                              <p>{booking.venue.location.city}</p>
                            </div>
                          </div>
                          <hr className=" bg-black shadow-none border-none h-0.5 my-6" />
                          <div className="flex flex-col gap-4">
                          <div className="flexR border-b border-gray-300 py-4 ">
                            <p>{dayjs(booking.dateFrom).format('DD/MM/YYYY')} - {dayjs(booking.dateTo).format('DD/MM/YYYY')} </p>
                            <p>{timeDiff(booking.dateFrom, booking.dateTo)} night</p>
                          </div>
                          <div className="flex flex-row items-center justify-end gap-2  border-b border-gray-300 py-4">
                            <p>{booking.guests} guests</p>
                            <img className="" src="guests.svg"/>
                           </div>
                          <div className="flex flex-row justify-between py-4  items-center md:flex-col-reverse md:gap-4 md:items-start">
                           
                            <span className="flex flex-col items-start md:flex-row md:justify-between md:gap-4 md:items-baseline">
                              <p className="uppercase text-xs text-gray-500 font-montS font-semibold tracking-wide">
                                Price per night
                              </p>
                              <p className="font-passionOne font-normal tracking-wide text-xl text-passionOrange">
                                {booking.venue.price} NOK
                              </p>
                            </span>
                            <span className="flex flex-col items-end md:flex-row md:justify-between md:gap-4 md:items-baseline">
                              <p className="uppercase text-sm text-gray-500 font-montS font-semibold tracking-wide">
                                Total
                              </p>
                              <p className="font-passionOne font-normal tracking-wide text-3xl">
                                {(booking.venue.price) * (timeDiff(booking.dateFrom, booking.dateTo))} NOK
                              </p>
                            </span>
                            </div>
                            <div>
                              <button>Edit</button>
                              <button>Cancel</button>
                            </div>
                          </div>
                        </div>
                      </div>
                  ))}

              </div>
            </section>
          </Menu>

          <Menu 
          title="Your Venues" 
          isActive={activeIndex == 2}
          amount={singleProfile.venues.length}
    >
            <section className="px-4 w-full bg-purpleBlack pt-10"     >
                  {/* My venues component */}
              <div className="flex flex-col gap-10">
              {singleProfile.venues.map((venue) => (
            <div className="lg:w-1/2 bg-white py-6">
            <div>
              <Slider media={venue.media}></Slider>
            </div>
            <div className="w-full px-6 md:w-3/4 md:p-0 mx-auto flex flex-col gap-8 my-12">
              <div className="md:flex flex-row items-center justify-between">
                <div className="flex flex-col gap-4">
                  <span className="flex flex-row gap-2">
                    <img src="/map_pin.svg" />
                    {venue.location && (
                      <p>
                        {venue.location.city},{" "}
                        {venue.location.zip},{" "}
                        {venue.location.country}
                      </p>
                    )}
                  </span>
                  <span className="flex flex-row gap-2">
                    <img src="/guests.svg" />
                    <p>
                      <span>Max </span>
                      {venue.maxGuests} guests{" "}
                    </p>
                  </span>
                </div>
                <div>
                  <span className="flex flex-col items-end  ">
                    <p className="uppercase text-xs text-gray-500 font-montS font-semibold tracking-wide">
                      Price per night
                    </p>
                    <p className="font-passionOne font-normal tracking-wide text-2xl">
                      {venue.price} NOK
                    </p>
                  </span>
                </div>
              </div>
              <hr className=" bg-black shadow-none border-none h-0.5 mb-2" />
              <div className="flex flex-col gap-4">
                <div>
                  <p className="bg-gray-200 w-full text-sm p-6">
                    {venue.description}
                  </p>
                </div>
                <div className="flexR w-2/3 mx-auto my-8 ">
                  <span className="flex flex-col items-center gap-1">
                    {venue.meta.wifi ? (
                      <p className="text-[#618F92]">&#x2713;</p>
                    ) : (
                      <p className="text-[#C00D63]">&#x2717;</p>
                    )}
                    <img src="/wifi.svg" className="w-6" />
                    <p className="text-gray-500 uppercase text-xs">Wifi</p>
                  </span>
                  <span className="flex flex-col items-center gap-1">
                    {venue.meta.breakfast ? (
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
                    {venue.meta.pets ? (
                      <p className="text-[#618F92]">&#x2713;</p>
                    ) : (
                      <p className="text-[#C00D63]">&#x2717;</p>
                    )}
                    <img src="/animals.svg" className="w-6" />
                    <p className="text-gray-500 uppercase text-xs">Pets</p>
                  </span>
                  <span className="flex flex-col items-center gap-1">
                    {venue.meta.parking ? (
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
              <div>
               <button>Edit</button>
               <button>Delete</button>
              </div>
            </div>
            
          </div>
          ))}
      
              </div>
            </section>
          </Menu>
        </>
      )}
    </>
  );
};

export default Account;

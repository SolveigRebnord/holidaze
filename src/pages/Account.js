import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { editProfile, getSingleProfile } from "../store/modules/ProfilesSlice";
import { getFilteredBookings } from "../store/modules/BookingSlice";
import { useState } from "react";
import React from "react";
import Menu from "../components/Menu";
import { useRef } from "react";
import Slider from '../components/shared/Slider'
import { Overlay, useComponentVisible } from "../components/profile/Overlay";
import Error from "../components/shared/Error";
import { toHaveClass } from "@testing-library/jest-dom/dist/matchers";
import Hero from "../components/shared/Hero";
import NewVenue from "../components/profile/NewVenue";
import EditVenue from "../components/profile/EditVenue";
import { isAction } from "@reduxjs/toolkit";
import { addNewVenue, deleteVenue, editVenue } from "../store/modules/VenueSlice"


const Account = () => {
  const dispatch = useDispatch();

  const { user: currentUser } = useSelector((state) => state.auth);
  const { singleProfile } = useSelector((state) => state.profiles);
  const { userVenues } = useSelector((state) => state.profiles);


  const dayjs = require('dayjs')
  dayjs().format('DD/MM/YYYY')
  

  if (!currentUser) {
    window.location.replace("/login");
  }

  const {isError} = useSelector(state => state.error);
  const {errorMessage} = useSelector(state => state.error);

  let name = currentUser.name;


  const myRef = useRef(null)

  const ref2 = useRef(null)

  const ref1 = useRef(null)

  const [activeIndex, setActiveIndex] = useState(0);
  const [active, setActive] = useState(null);
  const [refreshState, setRefreshState] = useState(true);
  const [fixVenue, setfixVenue] = useState("");


  let menuItems = [ {title: 'Add new venue'}, {title: 'Upcoming Bookings'}, {title: 'Your venues'}];
  menuItems = menuItems.map((item, index) => ({ ...item, id: index + 1 }))


  function handleClick(id) {
    console.log(id)

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

  function goToSection (id) {
    let number = id
    setActiveIndex(number);
    setActive(number);
    executeScroll(number);
  }

  const executeScroll = (id) => {
    let secRef = `ref${id}`
    myRef.current.scrollIntoView({behavior: "smooth", block: "start"})    
  }


  useEffect(() => {
    if (name) {
      dispatch(getSingleProfile(name));
    }
  }, [dispatch, name],);


  const timeDiff = (startDate, endDate) => {

  let start = dayjs(startDate)
  let end = dayjs(endDate)
  let diff = end.diff(start, 'day') 
  return diff;
  }

  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const profileEdit = () => {
    setShowProfileEdit(true)
  }

  const [newProfileImg, setnewProfileImg] = useState("");



  return (
    <>
      <Hero img={"/palmtree.jpg"} />

      {singleProfile && (
        <>
            {/* Profile Info component */}
          <section className=" absolute top-52 left-1/2 -translate-x-1/2 w-full  lg:w-1/2 flex flex-col-reverse md:flex-row items-center justify-center md:gap-24">
              <ul className=" flex flex-col gap-8 items-center text-sm pt-12 font-montS w-52 md:mt-20">
              {menuItems.map((item) => (
                <div>
                <li
                  className={`cursor-pointer p-4 w-52 mx-auto flex flex-row items-center justify-center gap-2 text-center ${active == item.id && 'm-active'} ${item.id === 1 && 'bg-passionOrange drop-shadow-md' }`}
                  id={item.id} 
                  key={item.id}   
                  onClick={(id) => {handleClick(id)}}>
                    {item.title} 
                    {item.id === 2 && ` (${singleProfile.bookings.length})`} 
                    {item.id === 3 && ` (${singleProfile.venues.length})`}
               
                </li> 
              </div>
              ))}
              </ul>
              <div className="bg-white flex flex-col gap-4 px-10 py-12 w-fit shadow-xl drop-shadow-md ">
                <div className="text-right ">
                  <Overlay>
                    <h2>Add a new image url to change your profile picture</h2>
                    <img
                      src={singleProfile.avatar}
                      alt={singleProfile.name}
                      className="h-32 w-32 object-cover object-center rounded-full drop-shadow-lg"
                    />
                    <form>
                      <input type="text" className="w-full h-10 border border-purpleBlack rounded-md px-4" onChange={(e) => setnewProfileImg(e.target.value)}></input>
                      <button type="submit" onClick={(e) => {e.preventDefault();dispatch(editProfile(singleProfile.name, newProfileImg))}} className="orangeBtn my-2 ">Add new profile picture</button>
                    </form>
                  {isError && <Error message={errorMessage} />}
                    </Overlay>
                </div>
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
          </section>
          
          <div ref={myRef} className=" block mt-96 "></div>
          
          <Menu 
          title="New Venue" 
          isActive={activeIndex == 1}
          amount={null}
          >
             <NewVenue goToSection={goToSection} setRefreshState={setRefreshState} />
          </Menu>

          <Menu 
          title="Upcoming bookings" 
          isActive={activeIndex == 2}
          amount={ singleProfile.bookings.length}
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
          isActive={activeIndex == 3}
          amount={singleProfile.venues.length}
    >
            <section className="px-4 w-full bg-purpleBlack pt-10 lg:mx-12"     >
                
              <div className="flex flex-col gap-10">
              {singleProfile.venues.map((venue) => ( <>
                {fixVenue === '' &&  <div className='lg:w-1/2 bg-white py-6'>
              <div>
                <Slider media={venue.media} site='account'></Slider>
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
               <button onClick={() => setfixVenue(venue)}>Edit</button>
               <button onClick={() => window.confirm('Are you sure you want to delete this venue? It can not be restored') ? dispatch(deleteVenue(venue.id)) + setTimeout(() => dispatch(getSingleProfile(name)), 2000) : null}>Delete</button>
              </div>
           
            </div>
            
          </div> }
          { fixVenue == venue && <EditVenue venue={venue} setfixVenue={setfixVenue}/> }
</>
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

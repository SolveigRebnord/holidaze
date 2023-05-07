import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { getSingleProfile } from "../store/modules/ProfilesSlice";
import { getFilteredBookings } from "../store/modules/BookingSlice";
import FadeIn from "react-fade-in/lib/FadeIn";
import { useState } from "react";
import React from "react";
import Menu from "../components/Menu";

const Account = () => {

    const dispatch = useDispatch();




    const { user: currentUser } = useSelector((state) => state.auth);
    const { singleProfile } = useSelector((state) => state.profiles);


    if (!currentUser) {
        window.location.replace('/login')
    }

    let name = currentUser.name;



  useEffect(() => {
    if (name) {
      dispatch(getSingleProfile(name));

    }
  }, [dispatch, name]);




      function FadeInSection(props) {
        const [isVisible, setVisible] = React.useState(true);
        const domRef = React.useRef();
        React.useEffect(() => {
            const observer = new IntersectionObserver(entries => {
              entries.forEach(entry => {
                setVisible(entry.isIntersecting);
              });
            });
        
            const { current } = domRef;
            observer.observe(current);
        
            //                      👇 
            return () => observer.unobserve(current);
          }, []);
        return (
       

<section className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
 ref={domRef}>
{props.children}

</section>

        )
      }
 

    



  return (
    <>
         <section className="relative z-0 mb-96 ">
            <img src="/palmtree.jpg" className="h-[300px] min-w-full object-cover object-left"></img>
         
          </section>
    
          {singleProfile && <>

      <section className="absolute top-52 left-1/2 -translate-x-1/2  w-1/2 flex flex-row items-center justify-center gap-32">
      <FadeIn delay={400} ><Menu /></FadeIn>
      <FadeIn delay={200} >
        <div className="bg-white flex flex-col gap-4 px-10 py-12 w-fit shadow-xl drop-shadow-md relative">
          <div className="text-right ">
            <button className="absolute top-4 right-4 "><img src="/gear.svg" /></button>
          </div>
          <FadeIn transitionDuration={1000}>
          <div className="flex flex-row gap-8 items-end">
            {name ? <h1 className="font-semibold text-xl"><span className="text-sm">Hi,</span> {name}!</h1> : <h1>Hi there!</h1>}
            <img
                src={singleProfile.avatar}
                alt={singleProfile.name}
                className="h-24 w-24 object-cover object-center rounded-full"/>
          </div>
          </FadeIn>
          <div className="flex flex-col gap-4">
            <hr className=" bg-gray-300 shadow-none border-none h-[1px] mt-10" />
            <span className="flex flex-col items-end text-sm">
              <p className="text-xs text-gray-500 uppercase unde">Email</p>
              <p className="underline">{singleProfile.email}</p>
            </span>
            <hr className=" bg-gray-300 shadow-none border-none h-[1px]" />
            <span className="flex flex-row justify-end text-sm gap-2">
              <p className="text-sm">Venuemanager</p>
              <span className="text-base font-semibold text-black">
                {singleProfile.venueManager ? <span>&#10003;</span> : <span>&#215;</span>}
                </span>
            </span>
            <hr className=" bg-gray-300 shadow-none border-none h-[1px]" />
          </div>
    
        </div>
        </FadeIn>
      </section>


<section className="flex flex-col gap-20" >
      <FadeInSection >
  <section className="bg-gray-300 h-96 w-full">
    <h2>Upcoming Bookings</h2>
     <ul className="flex flex-row gap-4 my-2 text-sm font-light lg:w-2/3 lg:mx-auto">
                {singleProfile.bookings.map((booking) => (
                  <li key={booking.id}>{booking.id}</li>
                ))}
              </ul>
    
  </section>
</FadeInSection>

<FadeInSection >
  <section className="bg-gray-300 h-96 w-full">
    <h2>Your Venues</h2>
    <ul className="flex flex-row gap-4 my-2 text-sm font-light lg:w-2/3 lg:mx-auto">
                {singleProfile.venues.map((venue) => (
                  <li key={venue.name}>{venue.name}</li>
                ))}
              </ul>

    
  </section>
</FadeInSection>
</section></>}
    </>
  );
};

export default Account;

//bg-[#004E56] rounded-md text-white font-semibold  w-full h-16 drop-shadow-md px-24 flex items-center justify-center hover:-translate-x-2 hover:scale-105 transition ease-in duration-100 delay-75 cursor-pointer
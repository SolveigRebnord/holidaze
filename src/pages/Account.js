import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { getSingleProfile } from "../store/modules/ProfilesSlice";
import { getFilteredBookings } from "../store/modules/BookingSlice";
import FadeIn from "react-fade-in/lib/FadeIn";
import { useState } from "react";
import React from "react";

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
    <><FadeIn transitionDuration={1000}>
      <section className="pt-32 mb-96">
      <FadeIn delay={200} >
        <div className="bg-white p-12 py-24 w-fit ml-16 shadow-xl drop-shadow-md relative">
          {name ? <h1 className="">Hi {name}!</h1> : <h1>Hi there!</h1>}
  
          {singleProfile && 
          <div>
          
              <p>{singleProfile.email}</p>
              <p>{singleProfile.name}</p>
     
      

              <img
                src={singleProfile.avatar}
                alt={singleProfile.name}
                className="h-32 w-32 object-contain object-center"/>
            
        

          </div>}
          <ul className="absolute top-1/3 -right-[78%] flex flex-col gap-8">
          <FadeIn delay={600}>
            <li 
            className="bg-[#004E56] rounded-md text-white font-semibold  w-full h-16 drop-shadow-md px-24 flex items-center justify-center hover:-translate-x-2 hover:scale-105 transition ease-in duration-100 delay-75 cursor-pointer">
            Upcoming bookings</li>
            </FadeIn>
          <FadeIn delay={700}>
            <li 
            className="bg-[#004E56] rounded-md text-white font-semibold  w-full h-16 drop-shadow-md px-24 flex items-center justify-center hover:-translate-x-2 hover:scale-105 transition ease-in duration-100 delay-75 cursor-pointer">                
            Upcoming bookings</li>
                </FadeIn>              
          <FadeIn delay={800}>
            <li 
            className="bg-[#004E56] rounded-md text-white font-semibold  w-full h-16 drop-shadow-md px-24 flex items-center justify-center hover:-translate-x-2 hover:scale-105 transition ease-in duration-100 delay-75 cursor-pointer">                
            Upcoming bookings</li>
                </FadeIn>

          </ul>
        </div>
        </FadeIn>
      </section>
      </FadeIn>
      <div className="bg-poolFloor h-screen absolute w-1/2 -z-10 top-0 object-cover bg-no-repeat"></div>

<section className="flex flex-col gap-20">
      <FadeInSection >
  <section className="bg-gray-300 h-96 w-full">
    <h2>Upcoming Bookings</h2>
    {singleProfile &&         <ul className="flex flex-row gap-4 my-2 text-sm font-light lg:w-2/3 lg:mx-auto">
                {singleProfile.bookings.map((booking) => (
                  <li key={booking.name}>{booking.id}</li>
                ))}
              </ul>}
    
  </section>
</FadeInSection>

<FadeInSection >
  <section className="bg-gray-300 h-96 w-full">
    <h2>Your Venues</h2>
    {singleProfile &&                  <ul className="flex flex-row gap-4 my-2 text-sm font-light lg:w-2/3 lg:mx-auto">
                {singleProfile.venues.map((venue) => (
                  <li key={venue.name}>{venue.name}</li>
                ))}
              </ul>
}
    
  </section>
</FadeInSection>
</section>
    </>
  );
};

export default Account;

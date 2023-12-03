import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getFilteredVenues, getVenues, searchVenues } from "../store/modules/VenueSlice";
import { useLocation } from "react-router-dom";
import {useState, React} from 'react';
import Hero from "../components/shared/Hero";
import Filter from "../components/venues/Filter";
import HomeSearch from "../components/HomeSearch";
import DisplayVenue from "../components/DisplayVenue";
import NewFilter from "../components/NewFilter";
import { act } from "react-dom/test-utils";

const Venues = () => {
  const dispatch = useDispatch();
  const { venues } = useSelector((state) => state.venues);
  const [activeFilter, setActiveFilter] = useState(false);

  const [order, setOrder] = useState('desc');
  const [Val1, setValg1] = useState('');
  const [minGuests, setMinGuests] = useState(0);
  const [priceGap, setPriceGap] = useState(0);
  let filter;

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    dispatch(getVenues(Val1, order, filter));
  }, [Val1, minGuests, priceGap]);


  let venuesByPrice = [];
  venues.map((venue) => (
     venuesByPrice.push(venue.price)
    ))

  const min = Math.min(...venuesByPrice)
  const max = Math.max(...venuesByPrice)

  Val1 && minGuests !== 0 ? filter = minGuests : filter = null;
  Val1 && priceGap !== 0 ? filter = priceGap : filter = null;


console.log(filter)

  let activeVenues = venues;


  const { user: currentUser } = useSelector((state) => state.auth);



  let homeData;
if (location.state) {
  homeData = location.state.search;
} 

let initialVal;
let initStartDate;
let initEndDate;
let initGuests;


if (homeData) {

  initStartDate = homeData.dateFrom;
initEndDate = homeData.dateTo;
initGuests = homeData.guests;

 
  initialVal = {
 
    dateFrom: initStartDate,
    dateTo: initEndDate,
    guests: initGuests
    
  } //Få til at den submitter her?

}

else {

  initialVal = {
    
    dateFrom: new Date(),
    dateTo: new Date(Date.now() + ( 3600 * 1000 * 24)),
    guests: 1
}
  }

   
const onSubmit = (values) => {
  let searchBody = {
    startDate: values.dateFrom,
    endDate: values.dateTo,
    guests: values.guests
  }
  dispatch(searchVenues(searchBody))

  //setForm(false)
  //actions.resetForm()
 
};
  return (
    <>
    <Hero img={"/mountain_resort.jpg"} text={'Venues'}></Hero>
      <section className=" relative">
        {!currentUser && (
          <Link to={'/login'} >
          <div className="w-full bg-passionOrange shadow-md flex justify-center text-xs items-center h-10 mb-8 font-semibold tracking-wide uppercase ">
            - Log in to find and book your perfect venue -
          </div>
          </Link>
        )}
        <section className="mx-6 md:w-2/3 md:mx-auto lg:w-1/2  bg-purpleBlack p-4 flex flex-col gap-4">
          <div>
            <div className="flex flex-row justify-between items-center uppercase">
              <h2 className="text-white font-semibold tracking-wider font-passionOne text-lg">
                Search
              </h2>
            
            </div>
            <HomeSearch onSubmit={onSubmit} initialValues={initialVal}  className={"z-20 calendar-venues"} />
          </div>
       
        </section>
      </section>
    

        {/* Filter/Sort component */}
        <div className="flexR my-8 mx-6 md:w-2/3 lg:w-1/2 md:mx-auto">
         
         
            <NewFilter 
            min={min} 
            max={max} 
            Val1={Val1} 
            setValg1={setValg1} 
            setPriceGap={setPriceGap} 
            priceGap={priceGap} minGuests={minGuests} 
            setMinGuests={setMinGuests} 
            setActiveFilter={setActiveFilter} 
            venues={activeVenues} ></NewFilter>
            
          <button className="bg-white border border-purpleBlack w-40 p-2 h-12 text-sm flexR">
            Sort
            <img src="/sort.svg" className="w-6" />
          </button>
        </div>
        <hr className="bg-black h-0.5 shadow-none my-6 border-none" />

        {/* Venues component */}
        <div className="flex flex-wrap justify-between gap-12 lg:gap-14 mx-6 md:mx-16 lg:mx-52">
          {activeVenues.map((venue) => (
            <DisplayVenue venue={venue}/>
            
          ))}
        </div>
    </>
  )
};

export default Venues;

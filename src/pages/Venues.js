import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, createRoutesFromChildren } from "react-router-dom";
import { getFilteredVenues, getVenues, searchVenues } from "../store/modules/VenueSlice";
import { useLocation } from "react-router-dom";
import { useFormik, FormikProvider, useField, Form, Formik } from "formik";
import * as yup from "yup"; 
import {useState, React} from 'react';
import Hero from "../components/shared/Hero";
import Filter from "../components/venues/Filter";
import dayjs from "dayjs";
import CalendarPick from "../components/shared/CalendarPick";

const Venues = () => {
  const dispatch = useDispatch();
  const { venues } = useSelector((state) => state.venues);
  const { filteredVenues } = useSelector((state) => state.venues);
  const [activeFilter, setActiveFilter] = useState(false);


  const FormInput = ({ label, value, type, ...props }) => {
    const [field, meta] = useField(props);
  
    return (
      <>
        <div className={"flex flex-col"}>
          <label className=" font-bold tracking-wide font-montS text-lg bg-opacity-40">
            {label}
          </label>
          <input
            type={props.type}
            {...field}
            {...props}
            value={field.value}
            enableReinitialize={true}

            className={` bg-white h-12 px-2
          ${type == "date" ? "area-input" : ""}
          ${type == "number" ? "ring-1 ring-black rounded-md w-14 text-center text-lg" : ""}
          ${meta.touched && meta.error ? "input-error" : ""}
          ${meta.touched && !meta.error && "input-ok"}`}
          />
        </div>
        <div className="h-8">
          {meta.touched && meta.error && (
            <p className=" text-right ">{meta.error}</p>
          )}
        </div>
      </>
    );
  };
  

  useEffect(() => {
    dispatch(getVenues());
  }, [dispatch]);

  let activeVenues = [];

  if (activeFilter) {
    activeVenues = filteredVenues
  }  else {
    activeVenues = venues
  } 
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
});



  const formRef = useRef()
  const { user: currentUser } = useSelector((state) => state.auth);
  const location = useLocation();

  const [maxGuestsFilter, setMaxGuestsFilter] = useState("");
  const [  priceFilter, setPriceFilter] = useState("");

  const [showCalendar, setShowCalendar] = useState(false)

  

let homeData = location.state
let initialVal;
let initPlace
let initStartDate;
let initEndDate;
let initGuests;

if (homeData) {

  initStartDate = homeData.search.dateFrom;
  initPlace = homeData.search.place;
  initEndDate = homeData.search.dateTo;
  initGuests = homeData.search.guests;


  initialVal = {
  initialValues: {
    startDate: selectedDateRange.startDate,
    endDate: selectedDateRange. endDate,
    guests: 2

    
  }} //Få til at den submitter her?

}
else {

  initialVal = {
    initialValues: {
      place: "",
      startDate: "",
      endDate: ""
      
    }}
  }







const [show, setShow] = useState(true);
const [isOk, setIsOk] = useState(false);

const handleSelect = (ranges) => {
  setSelectedDateRange(ranges.selection);
};

const ref = useRef(null);

const handleClickOutside = (event) => {
  if (ref.current && !ref.current.contains(event.target)) {
    setShowCalendar(false);
    setShow(true);
  }
};

useEffect(() => {
  document.addEventListener("click", handleClickOutside, true);
  return () => {
    document.removeEventListener("click", handleClickOutside, true);
  };
}, []);

const onClickClear = () => {
  setSelectedDateRange({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
};
    

  

       
      const onSubmit = (values) => {
          let searchBody = {
            startDate: selectedDateRange.startDate,
            endDate: selectedDateRange. endDate,
            guests: values.guests
          }
          dispatch(searchVenues(searchBody))
          setActiveFilter(true)
          //setForm(false)
          //actions.resetForm()
         
        };
        
        
      


  return (
    <>
    <Hero img={"/mountain_resort.jpg"} text={'Venues'}></Hero>
      <section className=" relative pt-4">
        {!currentUser && (
          <span className="absolute w-full bg-red-300 top-0">
            Log in to find it all
          </span>
        )}
        <section className="mx-6 md:w-2/3 md:mx-auto lg:w-1/2  bg-purpleBlack p-4 flex flex-col gap-4">
          <div>
            <div className="flex flex-row justify-between items-center uppercase">
              <h2 className="text-white font-semibold tracking-wider font-passionOne text-lg">
                Search
              </h2>
             
            </div>
          </div>
     
        <Formik initialValues={
          initialVal
        }
     
      onSubmit={onSubmit} 
      onChange={handleSelect}>
        {() => (
         <Form className="bg-white p-2 font-montS text-sm text-black">
          
               <div className=" text-center my-4">
                  <button onClick={() => setShowCalendar(!showCalendar)} ><img src="/calendar.svg" className="w-8 ring-2 ring-offset-4 ring-passionOrange rounded-sm shadow-md" /></button>
                </div>
            <div className="w-full p-2">
              <CalendarPick setShowCalendar={setShowCalendar} show={show} showCalendar={showCalendar} setSelectedDateRange={setSelectedDateRange} />
              <hr className="bg-black my-4"></hr>
              <div className="flex flex-row gap-2 items-center justify-center">
              <span>Minimum </span>
                <FormInput
                className="w-full text-right "
                name="guests"
                id="guests"
                type="number"
             
                ></FormInput>
                <span>Guests</span>
              </div>
            </div>
            <button className="orangeBtn my-4"  type="submit">Search</button>
           </Form>)}
          </Formik>
        </section>
      </section>
    

        {/* Filter/Sort component */}
        <div className="flexR my-8 mx-6 md:w-2/3 lg:w-1/2 md:mx-auto">
          <Filter >
            <div>
              <p>Filter</p>
              <input type="range" id="maxGuestsFilter" onChange={(e) => setMaxGuestsFilter(e.target.value)} min={1} max={100} step={1}></input>
              <p>{maxGuestsFilter}</p>

              <input type="range" id="priceFilter" onChange={(e) => setPriceFilter(e.target.value)} min={1} max={10000} step={1} className="w-96"></input>
              <p>{priceFilter}</p>

              <label>Wifi</label>
              <input type="checkbox" id="wifiFilter" ></input>
            </div>
          </Filter>
          <button className="bg-white border border-purpleBlack w-40 p-2 h-12 text-sm flexR">
            Sort
            <img src="/sort.svg" className="w-6" />
          </button>
        </div>
        <hr className="bg-black h-0.5 shadow-none my-6 border-none" />

        {/* Venues component */}
        <div className="flex flex-wrap justify-between gap-12 lg:gap-14 mx-6 md:mx-16 lg:mx-52">
          {activeVenues.map((venue) => (
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
          ))}
        </div>
    </>
  )
};

export default Venues;

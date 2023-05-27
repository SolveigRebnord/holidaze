import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, createRoutesFromChildren } from "react-router-dom";
import { getVenues } from "../store/modules/VenueSlice";
import { useLocation } from "react-router-dom";
import { useFormik, FormikProvider, useField } from "formik";
import * as yup from "yup"; 
import {useState, React} from 'react';
import Hero from "../components/shared/Hero";
import Filter from "../components/venues/Filter";

const Venues = () => {
  const dispatch = useDispatch();
  const { venues } = useSelector((state) => state.venues);

  useEffect(() => {
    dispatch(getVenues());
  }, [dispatch]);

  const formRef = useRef()
  const { user: currentUser } = useSelector((state) => state.auth);
  const location = useLocation();

  const [maxGuestsFilter, setMaxGuestsFilter] = useState("");
  const [  priceFilter, setPriceFilter] = useState("");


  
  
  {/* If search data from Home */}
let homeData = location.state
let initialVal;
let initPlace
let initStartDate;
let initEndDate;

if (homeData) {

  initStartDate = homeData.id.startDate;
  initPlace = homeData.id.place;
  initEndDate = homeData.id.endDate;

  initialVal = {
  initialValues: {
    place: initPlace,
    startDate:initStartDate,
    endDate: initEndDate
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
  {/* ----------- */}


    const validationSchema = yup.object({
        place: yup
          .string()
          .required('oh no')
          .min(3)
          ,
          startDate: yup
          .string(),
          endDate: yup
          .string(),
      });

    const [isForm, setForm] = useState(true);
    const [isConfirmation, setConfirmation] = useState(false);
  
    const formik = useFormik({
      initialValues: {
        place: "",
        startDate: "",
        endDate: ""
      },
        validationSchema,
        onSubmit: (values, actions) => {
          console.log(values);
          //setForm(false)
          //actions.resetForm()
         
        },
        
        
      });

      (formik.errors && console.log(formik.errors))



  return (
    <>
    {/* Hero */}
    <Hero img={"/mountain_resort.jpg"} text={'Venues'}></Hero>
      <section className=" relative pt-4">
        {!currentUser && (
          <span className="absolute w-full bg-red-300 top-0">
            Log in to find it all
          </span>
        )}
        <div className="flex flex-row justify-between items-center mb-12"></div>
         {/* Search component */}
        <section className="mx-6 md:w-2/3 md:mx-auto lg:w-1/2  bg-purpleBlack p-4 flex flex-col gap-4">
          <div>
            <div className="flex flex-row justify-between items-center uppercase">
              <h2 className="text-white font-semibold tracking-wide font-passionOne ">
                Search Results
              </h2>
              <button className="bg-white px-4 py-1 uppercase font-bold text-sm h-fit w-fit">
                Edit
              </button>
            </div>
          </div>
          {isForm && (
        <FormikProvider 
        value={formik}>
          <form        
          onSubmit={formik.handleSubmit}
            onChange={formik.handleChange} 
            className="bg-white p-2 font-montS text-sm text-black">
            <div className="flex flex-row justify-between items-center p-2">
              <input className="w-1/2 " id="startDate" value={initStartDate} placeholder="24.april-25.april"></input>
              <input className="w-1/2 " id="endDate" value={initEndDate} placeholder="24.april-25.april"></input>

              <input
                className="w-1/2 text-right "
                placeholder="2 guests"
              ></input>
            </div>
            <hr className="bg-black my-2"></hr>
            <input id="place" value={initPlace} 
            onBlur={formik.handleBlur}
           
              className="p-2 w-full text-right"
            ></input>
             {formik.errors.place && formik.touched.place && <p>{formik.errors.place}</p> }
             
            <button disabled={formik.isSubmitting} className={formik.isSubmitting && 'text-red-300'} type="submit">Search</button>
           </form>
        </FormikProvider>)}
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
          {venues.map((venue) => (
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
      </section>
    </>
  );
};

export default Venues;

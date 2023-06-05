import { useDispatch, useSelector } from "react-redux";
import {
  useFormik,
  FormikProvider,
  useField,
  Field,
  Formik,
  Form,
  FieldArray,
  FastField,
  useFormikContext,
} from "formik";
import * as yup from "yup";
import React, { isValidElement, useEffect, useRef } from "react";
import { useState } from "react";
import { type } from "@testing-library/user-event/dist/type";
import BookingSchema from "../schemas/BookingSchema";
import dayjs from "dayjs";
import { DateRange } from "react-date-range";
import { editBooking, makeBooking } from "../store/modules/BookingSlice";
import { useFormAction, useNavigate } from "react-router-dom";
import { getSingleProfile } from "../store/modules/ProfilesSlice";
import Calendar from "react-calendar";
import CountryList from "./CountryList";
import CalendarPick from "./shared/CalendarPick";
import BookingSearchSchema from "../schemas/BookingSearchSchema";
import { DateRangePicker } from "react-date-range";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

var relativeTime = require("dayjs/plugin/relativeTime");

dayjs.extend(relativeTime);

const FormInput = ({ label, value, ...props }) => {
  const [field, meta] = useField(props);
  console.log(meta.error)
  console.log(field.value)

  return (
    <>
      <div className={"flex flex-col "}>
        <label className={` font-bold tracking-wide font-montS text-lg bg-opacity-40
        ${label == "Ending date" ? "self-end" : ""}`}>
          {label}
        </label>
        <input
      
          type={props.type}
          {...field}
          {...props}
          value={value}
          className={` bg-white h-12 px-2 w-fit text-center
        ${type == "date" ? "area-input" : ""}
        ${type == "number" ? "number-input" : ""}
        ${meta.touched && meta.error ? "input-error" : ""}
        ${meta.touched && !meta.error && "input-ok"}`}
        />
      </div>
      <div className="h-8 relative">
        { meta.touched && meta.error && (
          <p className=" absolute top-8 w-max h-fit ">{meta.error}</p>
        )}
      </div>
    </>
  );
};

const GuestsInput = ({ label, value, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <div className={"flex flex-row justify-center items-end gap-8"}>
        <label className='font-normal tracking-widest text-base uppercase'>
          {label}
        </label>
        <input
        
          type={props.type}
          {...field}
          {...props}
          value={value}
          className={`pl-4  h-14 p-2 w-14 text-center text-lg  bg-transparent border-b-2 border-passionOrange focus:outline-none
        ${meta.touched && meta.error ? "input-error" : ""}
        ${meta.touched && !meta.error && "input-ok"}`}
        />
      </div>
      <div className="h-4">
        {meta.touched &&  meta.error && (
          <p className="block ">{meta.error}</p>
        )}
      </div>
    </>
  );
};

const HomeSearch = ({ ...props }) => {
  const [inputText, setInputText] = useState("");

  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const { singleProfile } = useSelector((state) => state.profiles);

  const searching = (e) => {
    let lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const [showCalendar, setShowCalendar] = useState(false);

  const navigate = useNavigate();

  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

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
    let bookingBody = {
      dateFrom: selectedDateRange.startDate,
      dateTo: selectedDateRange.endDate,
      guests: values.guests,
    };
    console.log(bookingBody);


    
 
        navigate("/venues", {
          state: {
            search: bookingBody,
          },
        });
    
  };

  return (
    <>
      <Formik
        initialValues={{
          startDate: selectedDateRange.startDate,
          endDate: selectedDateRange.endDate,
          guests: 0,
        }}
        
        onSubmit={onSubmit}
        onChange={handleSelect}
      >
        {() => (
          <Form className=" font-montS text-sm  flex flex-col gap-6 items-center  mx-auto z-10 absolute top-1/3 -translate-x-1/2 left-1/2 bg-[#001920] bg-opacity-90 backdrop-blur-sm md:w-1/2 p-10 lg:p-12  shadow-md text-white">
            <div className="h-20">
              <button type="button" onClick={() => setShowCalendar(!showCalendar)}>
  
                <img src="/calendar_white.svg" className="w-fit  border borde-white p-2 shadow-sm shadow-gray-300 hover:drop-shadow hover:border-2 hover:scale-105 transition-all ease-in-out duration-50 rounded-md" />

              </button>
            </div>
      
              <div className="" ref={ref}>
                <CalendarPick
                   setShowCalendar={setShowCalendar} setShow={setShow} show={show} showCalendar={showCalendar} setSelectedDateRange={setSelectedDateRange}
                />
                
              </div>
      

 <GuestsInput
              label="Guests"
              id="guests"
              name="guests"
              type="number"
            />
           

            <button type="submit" className="p-4 px-14 rounded-s-full rounded-e-full text-white font-semibold  bg-opacity-50 uppercase text-xs  bg-gradient-to-r from-gray-600 to-passionOrange bg-blend-overlay transition ease-in duration-200    hover:text-purpleBlack hover:bg-passionOrange">Search Venues</button>
          </Form>
        )}
      </Formik>

  
    </>
  );
};

export default HomeSearch;

{
  /* Skal gi ut input på submit, sendes til ny side og sender med inputdataene til skjemaet i venues forhåndsfylt basically 

 validationSchema={
              
                  yup.object().shape({
                      dateFrom: yup
                      .date()
                      .min(dayjs().subtract(1, 'day'))
                      .required(),
                
                      dateTo: yup
                      .date()
                      .min(yup.ref('dateFrom'), "must be after")
                      .required(),
              
                      guests: yup
                      .number()
                      .positive()
                      .integer()
                      .moreThan(0),
              
                    })
              }


                  <div className=" flex flex-col gap-8">
        <input
          onChange={props.handleChange}
          onKeyUp={(event) => searching(event)}
          type="text"
          id="place"
          value={props.place}
          className="bg-purpleBlack opacity-90 w-full h-16 rounded-md text-white shadow-md placeholder:italic font-montS placeholder:text-gray-500 px-6 "
          placeholder="Where are we going?"
        ></input>
        {inputText && <CountryList input={inputText} />}

        
      </div>
    <Link
                    to="/venues"
                        state={data}
                     className="bg-lightBeige p-1.5 px-6 text-xs uppercase font-bold rounded-md drop-shadow-md"
                    >
                        Find venues
                </Link>*/
}

//      <Calendar   date={new Date()} onChange={this.handleSelect}/>

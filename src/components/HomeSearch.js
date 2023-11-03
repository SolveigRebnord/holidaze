import { useDispatch, useSelector } from "react-redux";
import './calendar.scss'
import {
 
  useField,

  Formik,
  Form,

} from "formik";

import React, {  useEffect, useRef } from "react";
import { useState } from "react";
import { type } from "@testing-library/user-event/dist/type";

import dayjs from "dayjs";
import './calendar.css';
import {  useNavigate } from "react-router-dom";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import Calendar from "react-calendar";
import { date } from "yup";

var relativeTime = require("dayjs/plugin/relativeTime");

dayjs.extend(relativeTime);

const FormInput = ({ label, value, ...props }) => {
  const [field, meta] = useField(props);
  

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
      <div className="flex flex-row justify-center items-end gap-8">
        <label className='font-normal tracking-widest text-base uppercase'>
          {label}
        </label>
        <input
        
          type={props.type}
          {...field}
          {...props}
          value={value}
          className={`pl-4 h-14 p-4 w-20 text-center no-spin text-lg bg-transparent border-b-passionOrange border-b-2 focus:outline-none
        ${meta.touched && meta.error ? "input-error" : ""}
        ${meta.touched && !meta.error && "input-ok"}`}
        />
      </div>
      <div className="h-4">
        {meta.touched && meta.error && (
          <p className="block ">{meta.error}</p>
        )}
      </div>
    </>
  );
};


const HomeSearch = ({ ...props }) => {
  const [inputText, setInputText] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  console.log(props)

  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const { singleProfile } = useSelector((state) => state.profiles);

  const searching = (e) => {
    let lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };


  

  const navigate = useNavigate();


 


  const ref = useRef(null);

  const handleClickOutside = (event) => {
   
    if (ref.current && !ref.current.contains(event.target)) {
      setShowCalendar(false);
    
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);


  const onClickClear = () => {
    
  };

  const onSubmit = (values) => {
    let bookingBody = {
      dateFrom: dateFrom,
      dateTo: dateTo,
      guests: values.guests

    };

    console.log(bookingBody);
    props.onSubmit(bookingBody) 
   
 
        
  };

console.log(props.initialValues)

  const [value, setValue] = useState([props.initialValues.dateFrom, props.initialValues.dateTo]);
  const [dateFrom, changeDateFrom] = useState(props.initialValues[0])
  const [dateTo, changeDateTo] = useState(props.initialValues[1])

if (dateFrom !== value[0]) {
  changeDateFrom(value[0])
}
if (dateTo !== value[1]) {
  changeDateTo(value[1])
}



  const CALbtn = () => {
  
    setShowCalendar(!showCalendar)
    };
  

  return (
    <>
      <Formik
        initialValues={{
          dateFrom: dateFrom,
          dateTo: dateTo,
          guests: props.initialValues.guests,
        }}
        
        onSubmit={onSubmit}
        onChange={setValue}
      >
        {() => (
        
          <Form className={`form ${props.className}`}>
              <div className="relative text-center" ref={ref} >
              <div className="h-20 relative">
              <button type="button"  onClick={CALbtn}  className="cal-btn">
  
                <img src="/calendar_white.svg"  />

              </button>
            </div>
              <div className="w-fit flex flex-row justify-evenly items-center gap-6">
                    <input name="dateFrom" 
                    onClick={() => setShowCalendar(!showCalendar)} value={dayjs(dateFrom).format('ddd   DD / MM') }  className=" text-lg text-center font-sans bg-transparent tracking-wide hover:cursor-pointer border-b border-white focus:outline-none">
                     </input>
                     <span className="text-xl"> - </span>
                    <input name="dateTo" 
                    onClick={() => setShowCalendar(!showCalendar)} value={dayjs(dateTo).format('ddd   DD / MM') }  className="text-lg focus:outline-none text-center font-sans bg-transparent tracking-wide hover:cursor-pointer border-b border-white ">
                    
                    
                    </input>
                    
               </div>
               <div className="w-full text-center mt-2">
               <button type="button"   onClick={() =>  onClickClear()} className="bg-transparent  text-passionOrange  px-4 py-1 uppercase font-bold text-xs h-fit w-fit my-2">
                Clear
              </button>
               </div>
                
                {showCalendar && 
                <Calendar  value={value} onChange={setValue} returnValue="range" defaultView="month" minDate={new Date()} selectRange={true} className={'absolute top-40'}
                />}
                
                
              </div>
 <GuestsInput
              label="Guests"
              id="guests"
              name="guests"
              type="number"
              min='1'
           
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

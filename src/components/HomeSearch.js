import { useDispatch, useSelector } from "react-redux";
import { useFormik, FormikProvider, useField, Field, Formik, Form, FieldArray } from "formik";
import * as yup from "yup"; 
import React, { useEffect } from "react";
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

var relativeTime = require('dayjs/plugin/relativeTime')

dayjs.extend(relativeTime)




const FormInput = ({ label, value, ...props }) => {

  const [field, meta] = useField(props);



  return (
    <>
    <div className={'flex flex-col'}>
      <label className=" font-bold tracking-wide font-montS text-lg bg-opacity-40">{label}</label>
      <input
      type={props.type}
        {...field}
        {...props}

        className={` bg-white h-12 px-2
        ${type=='date' ? 'area-input' : ''}
        ${type=='number' ? 'number-input' : ''}
        ${type=='checkbox' ? 'check-input' : ''}
        ${meta.touched && meta.error ? 'input-error' : ''}
        ${meta.touched && !meta.error && 'input-ok'}`}
      />
      </div>
      <div className="h-8">
      {meta.touched && meta.error && <p className="text-white text-right ">{meta.error}</p>}
      </div>
      
    </>
  );
};


const HomeSearch = ({...props}) => {

 

  const [inputText, setInputText] = useState("");

  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const { singleProfile } = useSelector((state) => state.profiles);


  const [nights, setNights] = useState('')
  const [totalPrice, setTotalPrice] = useState("")

  const [isSent, setIsSent] = useState(false)



  const searching = (e) => {
    let lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);

  };


  const [date, setDate] = useState(new Date())
  const [showTime, setShowTime] = useState(false) 
  const [value, onChange] = useState([new Date(), new Date()]);
  const [showCalendar, setShowCalendar] = useState(false)

  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
    
  }

  const navigate = useNavigate();

  const newPage=(target) => {
      navigate('/venues', {
          state: {
              id: target
          }
      })
  }

  useEffect(() => {
    setShowCalendar(false)
}, []);

  const validationSchema = yup.object({
    place: yup
      .string(),
      startDate: yup
      .string(),
      endDate: yup
      .string(),
  });

const [isForm, setForm] = useState(true);
const [isConfirmation, setConfirmation] = useState(false);

const {values, handleBlur, handleSubmit, handleChange} = useFormik({
    initialValues: {
      place: "",
      startDate: date,
      endDate: date
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      //newPage(values)
     
    },
  });







     
      const onSubmit = (values) => {

        let bookingBody = {
            "dateFrom": values.dateFrom,
            "dateTo": values.dateTo,
            "guests": values.guests
          };
             dispatch(editBooking(bookingBody, props.booking.id))
             .then((data) => {
                console.log(data);
                dispatch(getSingleProfile(currentUser.name))
                setTimeout(() => {
                  props.setEditBooking("")
                }, 500);
                
              })
            .catch((error) => {
              console.log(error);
            });
      };



    return ( 
        <>
            <Formik initialValues={{
                "dateFrom": "" ,
                "dateTo": "" ,
                "guests": "" ,
              }}
            validationSchema={BookingSchema}
            onSubmit={onSubmit} 

            
            >
              {({iSubmitting}) => (
        <Form className="p-2 font-montS text-sm text-black flex flex-col gap-6  mx-auto">
                <div className="flex flex-row justify-between items-center">
                <FormInput
                      label="Title"
                      id="dateFrom"
                      name="dateFrom"
                      type="date"
                    />
                      <FormInput
                      label="Description"
                      id="dateTo"
                      name="dateTo"
                      type="date"
                    />
                </div>
                <FormInput
                      label="Price"
                      id="guests"
                      name="guests"
                      type="number"
                    />
                    <button type="submit"  > Confirm changes</button>

                    <div className="my-6 flex flex-col gap-8">
             <input
             onChange={handleChange}
                onKeyUp={(event) => searching(event)}
                type='text'
                id='place'
                value={values.place}
                className="bg-purpleBlack opacity-90 w-full h-16 rounded-md text-white shadow-md placeholder:italic font-montS placeholder:text-gray-500 px-6 " placeholder='Where are we going?'
              ></input>
              {inputText && < CountryList input={inputText} />}
                <div className="flex flex-row gap-6 mx-6 md:mx-auto md:w-2/3 relative">
                 {/* Calendar component */}
                <div className="flex flex-row gap-2">
                  <button onClick={() => setShowCalendar(!showCalendar)} >Calendar</button>
                </div>
                <div className="w-full h-52">

    
                {<CalendarPick setShowCalendar={setShowCalendar} showCalendar={showCalendar} />}
                </div>
                </div> 
                <button type='submit'>
                    Check Venues
                </button>
     


                    <div className="hidden text-sm lg:flex absolute flex-row lg:w-1/2  bottom-1/3 left-1/2 gap-2 -translate-x-1/2 bg-purpleBlack bg-opacity-90 p-2 rounded-md drop-shadow-lg">
                <input
                className="bg-transparent w-full h-14 rounded-md text-white tracking-wide font-montS placeholder:text-white px-6 focus:outline-none"
                placeholder="Where are we going?"
                ></input>
                <div className="flex flex-row gap-6 mx-6 md:mx-auto md:w-2/3 ">
                <div className="flex flex-row ">
                    <input className="bg-transparent w-24 h-14  text-white placeholder:italic font-montS placeholder:text-white px-4 border-white border-r-2 focus:outline-none"></input>
                    <input className=" bg-transparent w-24 h-14  text-white placeholder:italic font-montS placeholder:text-white px-4 focus:outline-none"></input>
                </div>
                <button onClick={newPage}>
                    venue
                </button>
                </div>
            </div></div>
            
                
                    </Form>)}
        </Formik>
              </>
     );
     
}
 
export default HomeSearch;






  
   
    
   
    
{/* Skal gi ut input på submit, sendes til ny side og sender med inputdataene til skjemaet i venues forhåndsfylt basically 

    <Link
                    to="/venues"
                        state={data}
                     className="bg-lightBeige p-1.5 px-6 text-xs uppercase font-bold rounded-md drop-shadow-md"
                    >
                        Find venues
                </Link>*/}

 



//      <Calendar   date={new Date()} onChange={this.handleSelect}/>

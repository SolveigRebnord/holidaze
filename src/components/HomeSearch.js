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
import React, { useEffect, useRef } from "react";
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
          value={value}
          className={` bg-white h-12 px-2
        ${type == "date" ? "area-input" : ""}
        ${type == "number" ? "number-input" : ""}
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

  const [show, setShow] = useState(false);
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
    setIsOk(true);

    {
      isOk &&
        navigate("/venues", {
          state: {
            search: bookingBody,
          },
        });
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          dateFrom: selectedDateRange.startDate,
          dateTo: selectedDateRange.endDate,
          guests: 0,
        }}
        onSubmit={onSubmit}
        onChange={handleSelect}
      >
        {() => (
          <Form className="p-2 font-montS text-sm text-black flex flex-col gap-6  mx-auto z-20">
            <div className="flex flex-row gap-2">
              <button onClick={() => setShowCalendar(!showCalendar)}>
                Calendar
              </button>
            </div>
            {showCalendar && (
              <div className="absolute left-4 bottom-0" ref={ref}>
                <DateRangePicker
                  onChange={handleSelect}
                  showSelectionPreview={true}
                  moveRangeOnFirstSelection={false}
                  months={1}
                  ranges={[selectedDateRange]}
                  direction="vertical"
                />
                <div className="text-right rdr-buttons-position mt-2 mr-3 ">
                  <button
                    className="btn btn-transparent text-primary rounded-0 px-4 mr-2"
                    onClick={() => setShow(true) + setShowCalendar(false)}
                  >
                    Done
                  </button>
                  <button
                    className="btn btn-transparent text-black rounded-0 px-4"
                    onClick={onClickClear}
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}

            <div className="w-full">
              {show && (
                <div className="">
                  <FormInput
                    name="dateFrom"
                    id="dateFrom"
                    label="Starting date"
                    onClick={() => setShowCalendar(true)}
                    value={dayjs(selectedDateRange.startDate).format(
                      "YYYY/MM/DD"
                    )}
                  />

                  <FormInput
                    name="dateTo"
                    id="dateTo"
                    onClick={() => setShowCalendar(true)}
                    label="Ending date"
                    value={dayjs(selectedDateRange.endDate).format(
                      "YYYY/MM/DD"
                    )}
                  />
                  <button
                    className="mb-1 btn btn-transparent text-danger"
                    onClick={() => setShow(false) + onClickClear()}
                    variant="outline-success"
                  >
                    {" "}
                    Clear
                  </button>
                </div>
              )}
            </div>

            <FormInput
              label="How many guests?"
              id="guests"
              name="guests"
              type="number"
            />

            <button type="submit"> Confirm changes</button>
          </Form>
        )}
      </Formik>

      <div className="my-6 flex flex-col gap-8">
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
          </div>
        </div>
      </div>
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

    <Link
                    to="/venues"
                        state={data}
                     className="bg-lightBeige p-1.5 px-6 text-xs uppercase font-bold rounded-md drop-shadow-md"
                    >
                        Find venues
                </Link>*/
}

//      <Calendar   date={new Date()} onChange={this.handleSelect}/>

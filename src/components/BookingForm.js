import { useDispatch, useSelector } from "react-redux";
import {
  useFormik,
  FormikProvider,
  useField,
  Field,
  Formik,
  Form,
  FieldArray,
} from "formik";
import * as yup from "yup";
import React from "react";
import { useState } from "react";
import { type } from "@testing-library/user-event/dist/type";
import BookingSchema from "../schemas/BookingSchema";
import dayjs from "dayjs";
import { DateRange } from "react-date-range";
import { makeBooking } from "../store/modules/BookingSlice";
import { useFormAction } from "react-router-dom";

var relativeTime = require("dayjs/plugin/relativeTime");

dayjs.extend(relativeTime);

const FormInput = ({ label, value, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <div className={"flex flex-col"}>
        <label className="text-white font-bold tracking-wide font-montS text-lg bg-opacity-40">
          {label}
        </label>
        <input
          type={props.type}
          {...field}
          {...props}
          className={` bg-white h-12 px-2
        ${type == "date" ? "area-input" : ""}
        ${type == "number" ? "number-input" : ""}
        ${type == "checkbox" ? "check-input" : ""}
        ${meta.touched && meta.error ? "input-error" : ""}
        ${meta.touched && !meta.error && "input-ok"}`}
        />
      </div>
      <div className="h-8">
        {meta.touched && meta.error && (
          <p className="text-white text-right ">{meta.error}</p>
        )}
      </div>
    </>
  );
};

const BookingForm = ({ ...props }) => {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const { singleProfile } = useSelector((state) => state.profiles);

  const [nights, setNights] = useState("");
  const [totalPrice, setTotalPrice] = useState("");

  const [book, setBook] = useState(false);

  const [isSent, setIsSent] = useState(false);

  const onSubmit = (values) => {
    let bookingBody = {
      dateFrom: values.dateFrom,
      dateTo: values.dateTo,
      guests: values.guests,
      venueId: props.venue.id,
    };

    let hue = dayjs(values.dateTo).diff(values.dateFrom, "day");
    setNights(hue);
    let totalp = props.venue.price * hue;
    setTotalPrice(totalp);
    setIsSent(true);
    console.log(totalp);

    {
      book &&
        dispatch(makeBooking(bookingBody))
          .then((data) => {
            console.log(data);
            window.location.replace("/account");
          })
          .catch((error) => {
            console.log(error);
          });
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          dateFrom: dayjs(new Date()).format("YYYY-MM-DD"),
          dateTo: dayjs(new Date()).format("YYYY-MM-DD"),
          guests: 0,
          venueId: "",
        }}
        validationSchema={BookingSchema}
        onSubmit={onSubmit}
      >
        {({ iSubmitting }) => (
          <Form className="p-2 font-montS text-sm text-black flex flex-col gap-6">
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
            <FormInput label="Price" id="guests" name="guests" type="number" />
            <button
              type={book ? "button" : "submit"}
              className="text-white disabled:text-red-300"
            >
              Check out
            </button>

            {isSent && (
              <div>
                <p className="uppercase text-passionOrange text-xs font-montS font-semibold tracking-wide">
                  {nights} Nights
                </p>
                <span className="flex flex-col items-end text-white">
                  <p className="uppercase text-passionOrange text-xs font-montS font-semibold tracking-wide">
                    Price per night
                  </p>
                  <p className="font-montS font-semibold tracking-wide text-normal text-white">
                    {props.venue.price} NOK
                  </p>
                </span>
                <hr className=" bg-white shadow-none border-none h-0.5 my-6" />
                <span className="flex flex-col items-end text-white">
                  <p className=" text-xs font-montS font-semibold tracking-wide">
                    incl. taxes
                  </p>
                  <p className="uppercase text-passionOrange text-sm font-montS font-semibold tracking-wide">
                    Total price
                  </p>
                  <p className="font-passionOne font-semibold tracking-wider text-3xl ">
                    {totalPrice} NOK
                  </p>
                </span>
                <hr className=" bg-white shadow-none border-none h-0.5 my-6" />
                <button
                  type="submit"
                  onClick={() => setBook(true) && onSubmit()}
                  className="ml-auto block bg-passionOrange uppercase text-purpleBlack px-12 w-fit font-semibold h-12 text-sm shadow-md drop-shadow-md"
                >
                  Book
                </button>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default BookingForm;

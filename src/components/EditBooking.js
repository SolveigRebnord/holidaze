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

import React from "react";

import { type } from "@testing-library/user-event/dist/type";
import BookingSchema from "../schemas/BookingSchema";
import dayjs from "dayjs";

import { editBooking, makeBooking } from "../store/modules/BookingSlice";


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

const EditBooking = ({ ...props }) => {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const { singleProfile } = useSelector((state) => state.profiles);



  const onSubmit = (values) => {
    let bookingBody = {
      dateFrom: values.dateFrom,
      dateTo: values.dateTo,
      guests: values.guests,
    };
    console.log(bookingBody, props.booking.id)
    dispatch(editBooking(bookingBody, props.booking.id))
      .then((data) => {
        console.log(data);
        //dispatch(getSingleProfile(currentUser.name));
        
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Formik
        initialValues={{
          dateFrom: dayjs(props.booking.dateFrom).format("YYYY-MM-DD"),
          dateTo: dayjs(props.booking.dateTo).format("YYYY-MM-DD"),
          guests: props.booking.guests,
        }}
        validationSchema={BookingSchema}
        onSubmit={onSubmit}
      >
        {({ iSubmitting }) => (
          <Form className="p-2 font-montS text-sm text-black flex flex-col gap-6 w-1/2 mx-auto">
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
            <FormInput label="Guests" id="guests" name="guests" type="number" />
            <button type="submit"> Confirm changes</button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EditBooking;

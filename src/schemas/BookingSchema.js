import * as yup from "yup";

const BookingSchema = yup.object().shape({
  dateFrom: yup.date().required("Required"),

  dateTo: yup.date().required("Required"),

  guests: yup.number().positive().integer().moreThan(0),
});

export default BookingSchema;

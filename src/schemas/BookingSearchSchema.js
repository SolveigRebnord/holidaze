import * as yup from "yup";

const BookingSearchSchema = yup.object().shape({
  dateFrom: yup.date().min(new Date()).required(),

  dateTo: yup.date().min(new Date()).max(new Date()).required(),

  guests: yup.number().positive().integer().moreThan(0),
});

export default BookingSearchSchema;

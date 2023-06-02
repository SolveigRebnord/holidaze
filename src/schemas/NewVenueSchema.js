import * as yup from "yup";

const NewVenueSchema = yup.object().shape({
  name: yup.string().required("Required"),

  description: yup.string().required("Required"),

  price: yup.number().positive().integer().moreThan(0),

  maxGuests: yup.number().positive().integer().moreThan(0),

  rating: yup.number().positive().integer().moreThan(0).lessThan(6),

  address: yup.string(),
  city: yup.string(),
  country: yup.string(),
});

export default NewVenueSchema;

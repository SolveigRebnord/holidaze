import * as yup from "yup";


const NewVenueSchema = 
    yup.object().shape({
        name: yup
        .string()
        .required("Required"),

        description: yup
        .string()
        .required("Required"),

        price: yup
        .number()
        .positive()
        .integer()
        .moreThan(0)
        .required('Required'),

        maxGuests: yup
        .number()
        .positive()
        .integer()
        .moreThan(0)
        .required('Required'),

        rating: yup
        .number()
        .positive()
        .integer()
        .moreThan(0)
        .lessThan(6),

        address: yup
        .string()
        .required("Required"),

        city: yup
        .string()
        .required("Required"),


        country: yup
        .string()
        .required("Required"),



      });

export default NewVenueSchema;

/*

        wifi: yup
        .boolean()
        .oneOf([true]),

        parking: yup
        .boolean()
        .oneOf([true]),

        pets: yup
        .boolean()
        .oneOf([true]),

        breakfast: yup
        .boolean()
        .oneOf([true]),

        address: yup
        .string()
        .required("Required"),

        city: yup
        .string()
        .required("Required"),

        zip: yup
        .number()
        .positive()
        .integer()
        .min(5)
        .max(5),

        country: yup
        .string()
        .required("Required"),

        continent: yup
        .string(),

        lat: yup
        .number()
        .integer(),

        lng: yup
        .number()
        .integer(),
          */
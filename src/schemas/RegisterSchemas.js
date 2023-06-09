import * as yup from "yup";


  const logInSchema = yup.object().shape({
    email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),

    password: yup
    .string()
    .required("Sure you got the right password?")
  });

  const signUpSchema = yup.object().shape({
    name: yup
    .string()
    .test(
        "len",
        "The username must be between 3 and 20 characters",
        (val) =>
          val && val.toString().length >= 3 && val.toString().length <= 20
      )
      .required("We need your pretty name!"),

    email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),

    password: yup
    .string()
    .test(
        "len",
        "The password must be between 6 and 40 characters",
        (val) =>
          val && val.toString().length >= 6 && val.toString().length <= 40
      )
      .required("Password is required"),
  });


 
  export {logInSchema, signUpSchema}
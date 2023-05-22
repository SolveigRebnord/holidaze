import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { register } from "../../store/modules/AuthSlice";

const SignUp = () => {
  const [successful, setSuccessful] = useState(false);

  const [showError, setError] = useState(false);

  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    email: "",
    avatar:
      "https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg",
    venueManager: false,
    password: "",
  };

  const profileImages = [{id: 1, url: '/no_image.png'}, {id: 2, url: 'https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg'}]


  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .test(
        "len",
        "The username must be between 3 and 20 characters.",
        (val) =>
          val && val.toString().length >= 3 && val.toString().length <= 20
      )
      .required("This field is required!"),
    email: Yup.string()
      .email("This is not a valid email.")
      .required("This field is required!"),
    password: Yup.string()
      .test(
        "len",
        "The password must be between 6 and 40 characters.",
        (val) =>
          val && val.toString().length >= 6 && val.toString().length <= 40
      )
      .required("This field is required!"),
  });

  const handleRegister = (formValue) => {
    const { name, email, password, avatar } = formValue;

    console.log(formValue)
    setSuccessful(false);

    dispatch(register({ name, email, password, avatar }))
      .unwrap()
      .then((data) => {
        console.log(data);
        //setSuccessful(true);
      })
      .catch((error) => {
        console.log(error);
        if (error === "Profile already exists") {
          setError(true);
        }

        setSuccessful(false);
      });
  };

  return (
    <>
    <h2 className="mt-20 font-passionOne text-white text-3xl text-center">Register</h2>
    <div className="text-white my-20 lg:w-1/2 mx-auto border p-6 border-white rounded-md ">

      <div className="">
       
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          <Form>
            {!successful && (
              <div className="flex flex-col gap-10 ">
                <div className="flex flex-col gap-2 items-center">
                  <h3 className="font-passionOne text-2xl">Choose your avatar</h3>
                  <p className="text-xs font-montS">&#40;You can add your own image later&#41;</p>
                </div>
                <div className="flex flex-row justify-evenly items-center">
                  {profileImages.map((img) => (
                  <label>
                  <Field type="radio" name="avatar" value={img.url} className="hidden w-full h-full " /><img src={img.url} className="w-20 h-20 object-cover rounded-full cursor-pointer"/>
                  </label>
                  ))}
                </div>

                <div className="mx-auto w-2/3 flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name">Name</label>
                    <Field name="name" type="text" className="w-full h-12 px-4 text-black text-sm rounded-md" />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-sm text-right text-passionOrange"
                  />
                  </div>

                  <div className="flex flex-col gap-2">
                  <label htmlFor="email">Email</label>
                  <Field name="email" type="email" className="w-full h-12 px-4 text-black text-sm rounded-md" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-sm text-right text-passionOrange"
                    />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="password">Password</label>
                  <Field
                    name="password"
                    type="password"
                    className="w-full h-12 px-4 text-black text-sm rounded-md"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-sm text-right text-passionOrange"
                    />
                </div>
                </div>
                <div className="form-group">
                  <button type="submit" className="orangeBtn">
                    Sign Up
                  </button>
                </div>
              </div>
            )}
          </Form>
        </Formik>
      </div>
      {showError && (
        <div className="bg-white text-center w-fit px-12 py-6 text-black text-xs mx-auto my-6 border-2 border-passionOrange ">
          <h3>Oh no!</h3>
          <p>Is it possible you might already have an account? <br></br> 
          Try to log in above, or get in touch with us</p>
        </div>
      )}
    </div>
    </>
  );
};

export default SignUp;



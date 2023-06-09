import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import { login, register } from "../../store/modules/AuthSlice";
import FormInput from "../FormInput";
import { signUpSchema } from "../../schemas/RegisterSchemas";

const SignUp = () => {

  const [showError, setError] = useState(false);
  const [profileAvatar, setProfileAvatar] = useState('')
  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    email: "",
    avatar:
      "https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg",
    venueManager: false,
    password: "",
  };

  const profileImages = [
    { id: 1, url: "https://cdn1.vectorstock.com/i/1000x1000/06/70/brunette-businessman-avatar-man-face-profile-icon-vector-21960670.jpg" },
    {
      id: 2,
      url: "https://img.freepik.com/premium-vector/avatar-icon001_750950-50.jpg",
    },
  ];





  const handleRegister = (formValue) => {
    const { name, email, password } = formValue;

    let avatar = profileAvatar


    dispatch(register({ name, email, password, avatar }))
      .unwrap()
      .then(() => {
        dispatch(login({email, password}))
        setTimeout(() => {
          window.location.replace('/account')
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        if (error === "Profile already exists") {
          setError(error);
        }
        if (error) {
          setError(error);
        }

      });
  };

  return (
    <>
    <hr className="bg-white h-0.5 mb-8"></hr>
      <h2 className=" font-passionOne text-white text-3xl text-center">
        Register
      </h2>
      <div className="text-white pb-20 pt-10 lg:w-1/2 mx-auto md:border p-6 border-white rounded-md ">
        <div className="">
          <Formik
            initialValues={initialValues}
            validationSchema={signUpSchema}
            onSubmit={handleRegister}
          >
            <Form>
          
                <div className="flex flex-col gap-10 ">
                  <div className="flex flex-col gap-2 items-center">
                    <h3 className="font-passionOne text-light text-2xl">
                      Choose your avatar
                    </h3>
                    <p className="text-sm font-montS">
                      &#40;You can add your own image later&#41;
                    </p>
                  </div>
                  <div className="flex flex-row justify-evenly items-center">
                    {profileImages.map((img) => (
                      <label>
                        <input
                          type="radio"
                          name="avatar"
                          id="avatar"
                          onChange={() => setProfileAvatar(img.url)} 
                          className="hidden w-full h-full "
                        />
                        <img
                          src={img.url}
                          className="w-20 h-20 object-cover rounded-full cursor-pointer"
                        />
                      </label>
                    ))}
                  </div>

                  <div className="mx-auto text-purpleBlack w-full px-4 flex flex-col gap-2">
                  <FormInput
                  label="Name"
                  id="name"
                  name="name"
                  type="text"
                  page='login'
                />
                  <FormInput
                  label="Email"
                  id="email"
                  name="email"
                  type="email"
                  page='login'
                />
                   <FormInput
                  label="Password"
                  id="password"
                  name="password"
                  type="password"
                  page='login'
                />

                  </div>
                  <div className="form-group">
                    <button type="submit" className="orangeBtn">
                      Sign Up
                    </button>
                  </div>
                </div>
          
            </Form>
          </Formik>
        </div>
        {showError && (
          <div className="bg-white text-center flex flex-col gap-2 w-fit px-6 py-6 text-black text-xs mx-auto my-6 border-2 border-passionOrange ">
            <h3>Oh no!</h3>
            <p className="font-semibold">{showError}</p>
            <p>
              There seems to be a problem, or is it possible you might already have an account? <br /> <br />
              Try again, or get in touch with us
            </p> 
          </div>
        )}
      </div>
    </>
  );
};
// add noroff email error

export default SignUp;

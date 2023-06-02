import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { login } from "../store/modules/AuthSlice";
import Register from "./Register";
import SignUp from "../components/signup/SignUp";

const Login = () => {
  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);

  const [showError, setError] = useState(false);

  const [showRegister, setRegister] = useState(false);

  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  const handleLogin = (formValue) => {
    const { email, password } = formValue;
    setLoading(true);

    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        navigate("/");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setError(true);
      });
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="pt-32 login-form bg-purpleBlack">
      <div className="">
        <h1 className="text-white font-passionOne text-2xl text-center tracking-wider uppercase">
          Sign In
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form className="mx-6 font-montS flex flex-col gap-8 my-12">
            <div className="form-group flex-col flex gap-2">
              <label htmlFor="email" className="text-white">
                Email
              </label>
              <Field
                name="email"
                type="text"
                className="form-control h-14 w-full rounded-md px-4"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="alert text-white"
              />
            </div>

            <div className="form-group flex-col flex gap-2">
              <label htmlFor="password" className="text-white">
                Password
              </label>
              <Field
                name="password"
                type="password"
                className="form-control  h-14 w-full rounded-md"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="alert text-white"
              />
            </div>

            <div className="form-group">
              <button type="submit" className="text-white" disabled={loading}>
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>
            {showError && (
              <div>
                <p>Invalid, do you have an account</p>
              </div>
            )}
          </Form>
        </Formik>

        <div className="text-white">
          <h2 className="text-center">
            Dont have an account?
            <button
              onClick={() => setRegister(true)}
              className="block mx-auto "
            >
              Register now
            </button>
            to book your next holiday destination!
          </h2>
        </div>

        {showRegister && <SignUp />}
      </div>
    </div>
  );
};

export default Login;

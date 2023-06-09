import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { login } from "../store/modules/AuthSlice";
import SignUp from "../components/signup/SignUp";
import { logInSchema } from "../schemas/RegisterSchemas";
import FormInput from "../components/FormInput";

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
          validationSchema={logInSchema}
          onSubmit={handleLogin}
        >
         
          <Form className="mx-6 font-montS flex flex-col gap-3 my-12">
      
            <FormInput
              label="Email"
              id="email"
              name="email"
              type="text"
              page='login'
            />
             <FormInput
              label="Password"
              id="password"
              name="password"
              type="text"
              page='login'
            />
             

            <div className="form-group">
              <button type="submit" className="orangeBtn" disabled={loading}>
              
              Login

              </button>
            </div>
            {showError && (
              <div className="text-purpleBlack bg-white p-8 text-center flex flex-col gap-2 my-6">
                <p className="font-semibold">Are you sure you have an account?</p>
                <p>Try again, or scroll down to register a new account</p>
              </div>
            )}
          </Form>

        </Formik>

        <div className="text-white pb-20 flex flex-col gap-4 text-center">
          <h2 className="font-semibold text-lg">
            Dont have an account?
            </h2>
            <button
              onClick={() => setRegister(true)}
              className="block mx-auto border-2 border-passionOrange px-8 py-2"
            >
              Register now
            </button>
            
            <p>to book your next holiday destination!</p>
        
        </div>

        {showRegister && <SignUp />}
      </div>
    </div>
  );
};

export default Login;

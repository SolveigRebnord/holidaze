import {useState, React} from 'react';
import { useFormik, FormikProvider, useField } from "formik";
import * as yup from "yup"; 
import { Link, NavLink, useNavigate } from 'react-router-dom';

const HomeSearch = () => {

    const data = ['hei', 'ho']

    const [date, setDate] = useState(new Date())
    const [showTime, setShowTime] = useState(false) 
    const [value, onChange] = useState([new Date(), new Date()]);
  
    const selectionRange = {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    }

    const navigate = useNavigate();

    const newPage=(target) => {
        navigate('/venues', {
            state: {
                id: target
            }
        })
    }

    const validationSchema = yup.object({
        place: yup
          .string()
          ,
          startDate: yup
          .string(),
          endDate: yup
          .string(),
      });

    const [isForm, setForm] = useState(true);
    const [isConfirmation, setConfirmation] = useState(false);
  
    const formik = useFormik({
        initialValues: {
          place: "",
          startDate: "",
          endDate: ""
        },
        validationSchema,
        onSubmit: (values) => {
          console.log(values);
          newPage(values)
         
        },
      });

      const TextInputLiveFeedback = ({ label, helpText, ...props }) => {
        const [field, meta] = useField(props);
      
        const [didFocus, setDidFocus] = React.useState(false);
        const handleFocus = () => setDidFocus(true);
        const handleChange = () => handleChange();
        const showFeedback =
          (!!didFocus && field.value.trim().length > 2) || meta.touched;
      
        const [isShown, setIsShown] = useState(true);
      
        return (
          <div
            className={`form-control ${
              showFeedback ? (meta.error ? "invalid" : "valid") : ""
            }`}
          >
            <div className="flex items-center justify-between flex-row text-lg font-semibold my-3">
              <label htmlFor={props.id}>{label}</label>
              <div
                className="text-sm font-light text-gray-600 "
                id={`${props.id}-help`}
                tabIndex="-1"
              >
                <div className="relative">
                  <button
                    className=" "
                    onMouseEnter={() => setIsShown(true)}
                    onMouseLeave={() => setIsShown(false)}
                  >
                    <img src="/question.svg" className="w-6"></img>
                  </button>
                  {isShown && (
                    <div className="min-w-fit whitespace-nowrap bg-white absolute bottom-2 right-8 z-2">
                      {helpText}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {field.name !== "message" ? (
              <div>
                <input
                  className="border border-gray-200 px-2 rounded-md w-full h-10 "
                  {...props}
                  {...field}
                  aria-describedby={`${props.id}-feedback ${props.id}-help`}
                  onFocus={handleFocus}
                />
              </div>
            ) : (
              <div>
                <textarea
                  className="border border-gray-200 px-2 rounded-md w-full "
                  {...props}
                  {...field}
                  maxLength={500}
                  aria-describedby={`${props.id}-feedback ${props.id}-help`}
                  onFocus={handleFocus}
                />
              </div>
            )}
            <div className="h-6 pt-1 ">
              {" "}
              {showFeedback ? (
                <div
                  id={`${props.id}-feedback`}
                  aria-live="polite"
                  className="feedback text-sm pl-1 text-orange-600"
                >
                  {meta.error ? meta.error : "✓"}
                </div>
              ) : null}
            </div>
          </div>
        );
      };
    
   
    return (  
        <section>
            <div className="mx-4 my-8 flex flex-col gap-6 md:mx-auto md:w-2/3 lg:hidden">
                {/* Locations from venues store */}
                {isForm && (
        <FormikProvider value={formik}>
          <form
            onSubmit={formik.handleSubmit}
            onChange={formik.handleChange}
            className="my-16 lg:mt-8"
          >
             <input 
                className="bg-purpleBlack opacity-90 w-full h-16 rounded-md text-white shadow-md placeholder:italic font-montS placeholder:text-white px-6 "
                placeholder="Where are we going?"
                value={formik.values.place}
                id='place'
                ></input>
                <div className="flex flex-row gap-6 mx-6 md:mx-auto md:w-2/3 ">
                 {/* Calendar component */}
                <div className="flex flex-row ">
                    <input value={formik.values.startDate} id='startDate' className="bg-purpleBlack opacity-90 w-full h-14 rounded-l-md text-white shadow-md placeholder:italic font-montS placeholder:text-white px-4 border-white border-r-2"></input>
                    <input value={formik.values.endDate} id='endDate' className="bg-purpleBlack opacity-90 w-full h-14 rounded-r-md text-white shadow-md placeholder:italic font-montS placeholder:text-white px-4 "></input>
                </div>
                <button type='submit'>
                    venue
                </button>
                </div> 
          </form>
        </FormikProvider>)}
            </div>
            {/* Lg screen */}
            <div className="hidden text-sm lg:flex absolute flex-row lg:w-1/2  bottom-1/3 left-1/2 gap-2 -translate-x-1/2 bg-purpleBlack bg-opacity-90 p-2 rounded-md drop-shadow-lg">
                <input
                className="bg-transparent w-full h-14 rounded-md text-white tracking-wide font-montS placeholder:text-white px-6 focus:outline-none"
                placeholder="Where are we going?"
                ></input>
                <div className="flex flex-row gap-6 mx-6 md:mx-auto md:w-2/3 ">
                <div className="flex flex-row ">
                    <input className="bg-transparent w-24 h-14  text-white placeholder:italic font-montS placeholder:text-white px-4 border-white border-r-2 focus:outline-none"></input>
                    <input className=" bg-transparent w-24 h-14  text-white placeholder:italic font-montS placeholder:text-white px-4 focus:outline-none"></input>
                </div>
                <button onClick={newPage}>
                    venue
                </button>
                </div>
            </div>
        </section>  
  );
}
{/* Skal gi ut input på submit, sendes til ny side og sender med inputdataene til skjemaet i venues forhåndsfylt basically 

    <Link
                    to="/venues"
                        state={data}
                     className="bg-lightBeige p-1.5 px-6 text-xs uppercase font-bold rounded-md drop-shadow-md"
                    >
                        Find venues
                </Link>*/}

 
export default HomeSearch ;


//      <Calendar   date={new Date()} onChange={this.handleSelect}/>

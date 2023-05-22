import {useState, React} from 'react';
import { useFormik, FormikProvider, useField } from "formik";
import * as yup from "yup"; 
import { Link, NavLink, useNavigate } from 'react-router-dom';
import CountryList from './CountryList';
import CalendarPick from './shared/CalendarPick';

const HomeSearch = () => {

  const [inputText, setInputText] = useState("");

  const searching = (e) => {
    let lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);

  };

    const data = ['hei', 'ho']

    const [date, setDate] = useState(new Date())
    const [showTime, setShowTime] = useState(false) 
    const [value, onChange] = useState([new Date(), new Date()]);
    const [showCalendar, setShowCalendar] = useState(false)
  
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
          .string(),
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
          startDate: date,
          endDate: date
        },
        validationSchema,
        onSubmit: (values) => {
          console.log(values);
          //newPage(values)
         
        },
      });


   const closeCalendar = (bool) => {
        setShowCalendar(bool)
   }
   
   console.log(selectionRange)
    
   
    return (  
        <section>
            <div className="mx-4 my-8 flex flex-col gap-6 md:mx-auto md:w-2/3 lg:hidden">
                {/* Locations from venues store */}
                {isForm && (
        <FormikProvider value={formik}>
          <form
            onSubmit={formik.handleSubmit}
            onChange={formik.handleChange}
            className="my-6 flex flex-col gap-8">
             <input
                onKeyUp={(event) => searching(event)}
                type='text'
                id='place'
                value={formik.values.place}
                className="bg-purpleBlack opacity-90 w-full h-16 rounded-md text-white shadow-md placeholder:italic font-montS placeholder:text-gray-500 px-6 " placeholder='Where are we going?'
              ></input>
              {inputText && <CountryList input={inputText} />}
                <div className="flex flex-row gap-6 mx-6 md:mx-auto md:w-2/3 relative">
                 {/* Calendar component */}
                <div className="flex flex-row gap-2">
                  <button onClick={() => setShowCalendar(!showCalendar)} >Calendar</button>
                </div>
                {showCalendar && <CalendarPick />}
                </div> 
                <button type='submit'>
                    Check Venues
                </button>
     
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

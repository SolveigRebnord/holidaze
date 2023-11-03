import dayjs from "dayjs";
import { Field } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { DateRangePicker } from "react-date-range";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file



const CalendarPick = ({ ranges, onChange, formik, setShowCalendar, showCalendar, ...props }) => {
     const [selectedDateRange, setSelectedDateRange] = useState({
          startDate: new Date(),
          endDate: new Date(),
          key: "selection",
     });

     const [show, setShow] = useState(true);


 

     const handleSelect = ranges => {
          setSelectedDateRange(ranges.selection);
          props.setSelectedDateRange(ranges.selection)
     };


    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
        setShowCalendar(false); 
        setShow(true)
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

 

     const onClickClear = () => {
          setSelectedDateRange({
               startDate: new Date(),
               endDate: new Date(),
               key: "selection"
          });
     
       
     };

     return (
          <> 

<section className=' h-fit relative'>
        
           {showCalendar && 
               <div className="absolute left-0 top-0 h-fit w-fit z-30 " ref={ref}>
                    <DateRangePicker
                         onChange={handleSelect}
                         showSelectionPreview={true}
                         moveRangeOnFirstSelection={false}
                         months={1}
                         ranges={[selectedDateRange]}
                         direction="vertical"
                    />
                    <div className="">
                         <button
                              className="btn btn-transparent text-primary rounded-0 px-4 mr-2 "
                              onClick={() => setShow(true) + setShowCalendar(false)}
                         >
                              Done
                         </button>
                         <button type="button"
                              className="btn btn-transparent text-black rounded-0 px-4"
                              onClick={onClickClear}
                         >
                              Clear
                         </button>
                    </div>
               </div>}

            

               {show && 
               <div className="w-full flex flex-row justify-evenly items-center gap-6">
                    <input name="dateFrom"   
                    onClick={() => setShowCalendar(true)} value={dayjs(selectedDateRange.startDate).format('dddd DD.MM') }className="w-40 text-lg text-center font-sans bg-transparent tracking-wide hover:cursor-pointer border-b border-white focus:outline-none">
                     </input>
                     <span className="text-xl"> - </span>
                    <input name="dateTo" 
                    onClick={() => setShowCalendar(true)} value={dayjs(selectedDateRange.endDate).format('dddd DD.MM') }  className="w-40 text-lg focus:outline-none text-center font-sans bg-transparent tracking-wide hover:cursor-pointer border-b border-white ">
                    
                    
                    </input>
                    
               </div>}
               <div className="w-full text-center mt-2">
               <button type="button"   onClick={() =>  onClickClear()} className="bg-transparent  text-passionOrange  px-4 py-1 uppercase font-bold text-xs h-fit w-fit my-2">
                Clear
              </button>
               </div>
              
               

              
               </section>
          </>
     );
};

export default CalendarPick;

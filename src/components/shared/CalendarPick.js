import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { tileProps } from "react-calendar/dist/cjs/shared/propTypes";
import { DateRangePicker } from "react-date-range";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file



const CalendarPick = ({ ranges, onChange, formik, setShowCalendar, showCalendar, ...props }) => {
     const [selectedDateRange, setSelectedDateRange] = useState({
          startDate: new Date(),
          endDate: new Date(),
          key: "selection",
     });

     const [show, setShow] = useState(false);


 

     const handleSelect = ranges => {
          setSelectedDateRange(ranges.selection);
          props.setSelectedDateRange(ranges.selection)
     };


    const [isComponentVisible, setIsComponentVisible] = useState(false);
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
               <div className="absolute left-0 top-0 z-30 h-fit " ref={ref}>
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
                              className="btn btn-transparent text-primary rounded-0 px-4 mr-2"
                              onClick={() => setShow(true) + setShowCalendar(false)}
                         >
                              Done
                         </button>
                         <button
                              className="btn btn-transparent text-black rounded-0 px-4"
                              onClick={onClickClear}
                         >
                              Clear
                         </button>
                    </div>
               </div>}

               <div className="">

               {props.show && 
               <div className="w-full flex flex-row justify-evenly items-center">
                    <input name="dateFrom"  onClick={() => setShowCalendar(true)} value={dayjs(selectedDateRange.startDate).format('YYYY/MM/DD') }  className="w-24 text-center">
                     </input>
                    <input name="dateTo" onClick={() => setShowCalendar(true)} value={dayjs(selectedDateRange.endDate).format('YYYY/MM/DD') } className="w-24 text-center">
                    
                    
                    </input>
                    
               </div>}
               <div className="w-full text-right">
               <button   onClick={() => setShow(false) + onClickClear()} className="bg-white px-4 py-1 uppercase font-bold text-xs h-fit w-fit my-2">
                Clear
              </button>
               </div>
              
               

               </div>
               </section>
          </>
     );
};

export default CalendarPick;

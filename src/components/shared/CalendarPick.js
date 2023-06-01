import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { DateRangePicker } from "react-date-range";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file



const CalendarPick = ({ ranges, onChange, formik, setShowCalendar, showCalendar, ...rest }) => {
     const [selectedDateRange, setSelectedDateRange] = useState({
          startDate: new Date(),
          endDate: new Date(),
          key: "selection",
     });

     const [show, setShow] = useState(false);


 

     const handleSelect = ranges => {
          setSelectedDateRange(ranges.selection);
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

    useEffect(() => {
     setShowCalendar(true)
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

<section className='w-full h-full'>
        
           {showCalendar && 
               <div className="absolute left-4 bottom-0 z-20" ref={ref}>
                    <DateRangePicker
                         onChange={handleSelect}
                         showSelectionPreview={true}
                         moveRangeOnFirstSelection={false}
                         months={1}
                         ranges={[selectedDateRange]}
                         direction="vertical"
                    />
                    <div className="text-right rdr-buttons-position mt-2 mr-3">
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

               <div className="w-full">


               {show && <div className="">
                    <p className="my-auto d-inline">Start Date :{" "}
                    {dayjs(selectedDateRange.startDate).format('YYYY/MM/DD') }{" | "}
                    End Date :{" "}
                    {dayjs(selectedDateRange.endDate).format('YYYY/MM/DD') }
                    </p>
                    <button className="mb-1 btn btn-transparent text-danger" onClick={() => setShow(false) + onClickClear()} variant="outline-success"> Clear</button>
                    
               </div>}</div>
               </section>
          </>
     );
};

export default CalendarPick;

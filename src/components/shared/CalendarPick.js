import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file



const CalendarPick = ({ ranges, onChange, formik, ...rest }) => {
     const [selectedDateRange, setSelectedDateRange] = useState({
          startDate: new Date(),
          endDate: new Date(),
          key: "selection",
     });
     const [show, setShow] = useState(false);


     function formatDateDisplay(date, defaultText) {
          if (!date) return defaultText;
          return (date, "MM/DD/YYYY");
     }

     const handleSelect = ranges => {
          setSelectedDateRange(ranges.selection);
          console.log(ranges.selection);
     };



     const onClickClear = () => {
          setSelectedDateRange({
               startDate: new Date(),
               endDate: new Date(),
               key: "selection"
          });
          setShow(false);
     };

     return (
          <>
               <div className="absolute top-16">
                    <DateRangePicker
                         onChange={handleSelect}
                         showSelectionPreview={true}
                         moveRangeOnFirstSelection={false}
                         months={1}
                         ranges={[selectedDateRange]}
                         direction="vertical"
                    />
                    <div className="text-right position-relative rdr-buttons-position mt-2 mr-3">
                         <button
                              className="btn btn-transparent text-primary rounded-0 px-4 mr-2"
                              onClick={() => setShow(true)}
                         >
                              Done
                         </button>
                         <button
                              className="btn btn-transparent text-danger rounded-0 px-4"
                              onClick={onClickClear}
                         >
                              Clear
                         </button>
                    </div>
               </div>

               {show && <div className="h-100 mt-3 alert alert-transparent">
                    <p className="my-auto d-inline">Start Date :{" "}
                    {formatDateDisplay(selectedDateRange.startDate)}{" | "}
                    End Date :{" "}
                    {formatDateDisplay(selectedDateRange.endDate)}
                    </p>
                    <button className="mb-1 btn btn-transparent text-danger" onClick={() => setShow(false)} variant="outline-success"> Close</button>
                    {selectedDateRange.startDate && <input  value={selectedDateRange.startDate} id='startDate' className="bg-purpleBlack opacity-90 w-full h-14  text-white shadow-md placeholder:italic font-montS rounded-md placeholder:text-white px-4"></input>}
                    <input value={selectedDateRange.endDate} id='endDate' className="rounded-md bg-purpleBlack opacity-90 w-full h-14  text-white shadow-md placeholder:italic font-montS placeholder:text-white px-4 "></input>
               </div>}
          </>
     );
};

export default CalendarPick;

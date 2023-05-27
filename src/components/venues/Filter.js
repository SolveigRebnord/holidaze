import React, { useRef, useEffect, useState } from "react";

const Filter = (props) => {

    const [isComponentVisible, setIsComponentVisible] = useState(false);
    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsComponentVisible(false);
        }
    };




    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return (
       <div ref={ref}>
         <button onClick={() => setIsComponentVisible(true)} className="bg-white border border-purpleBlack w-40 p-2 h-12 text-sm flexR">
                    <img src="/filter.svg" className="w-6" />
                    Filter
                  </button>
          {isComponentVisible && 
          <section className="fixed w-full left-0 top-0 h-full z-20 bg-white flex flex-col items-center justify-start p-8 gap-6">
            {props.children}
            <button onClick={() => setIsComponentVisible(false)}>X</button>
        </section>}
       </div>
    );

}
 


export default Filter ;


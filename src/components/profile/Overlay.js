import React, { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


const Overlay = (props) => {



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
         <button onClick={() => setIsComponentVisible(true)} className="absolute top-4 right-4 ">
                    <img src="/gear.svg" />
                  </button>
          {isComponentVisible && 
          <section className="fixed w-full left-0 top-0 h-full z-20 bg-white flex flex-col items-center justify-start p-8 gap-6">{props.children}</section>}
       </div>
    );

}
 


export {Overlay} ;
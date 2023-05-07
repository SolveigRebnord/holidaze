import FadeIn from "react-fade-in/lib/FadeIn";
import { useState } from "react";
import { useRef } from "react";

const Menu = () => {



  const initialvalues = {
    menu1: false,
    menu2: false, 
    menu3: false,
  };

  const [menu, setMenu] = useState(initialvalues);

  const myRef = useRef(null)

 


    return (   
        <>
    <ul className=" flex flex-col gap-8 items-center text-sm pt-12 font-montS">
        <FadeIn delay={600}>
         {menu.menu1 ? 
           
                <li onClick={() => {setMenu(menu => ({ ...initialvalues, menu1: true }))}}
                className="cursor-pointer text-red-900">
                &#9993; Upcoming bookings
                </li>
             : 
           
                <li onClick={() => setMenu(menu => ({ ...initialvalues, menu1: true }))}
                className="cursor-pointer ">
                &#9993; Upcoming bookings
                </li>
            
        }</FadeIn>
        <FadeIn delay={700}>
        {menu.menu2 ? 
          
                <li onClick={() => setMenu(menu => ({ ...initialvalues, menu2: true }))}
                className="cursor-pointer text-red-900">
                 My venues
                </li>
      : 
          
                <li onClick={() => setMenu(menu => ({ ...initialvalues, menu2: true }))}
                className="cursor-pointer ">
                 My venues
                </li>
     
        }</FadeIn>
        <FadeIn delay={800}>
       {menu.menu3 ? 
                <li onClick={() => setMenu(menu => ({ ...initialvalues, menu3: true }))}
                className="cursor-pointer text-red-900">
                Archive
                </li> : 
                <li onClick={() => setMenu(menu => ({ ...initialvalues, menu3: true }))}
                className="cursor-pointer ">
                Archive
                </li>
        }</FadeIn>
    </ul> 

    </>);
}
 
export default Menu;
/*
<li onClick={() => dispatch(clickMenu({menu1}))}
className="cursor-pointer text-red-900">
&#9993; Upcoming bookings
</li>*/
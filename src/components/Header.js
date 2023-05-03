import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";
import { useState, useEffect } from "react";



const Header = () => {



  const [showMenu, setMenu] = useState(false);

  const { pathname } = useLocation();
  useEffect(() => {
    setMenu(false);
  }, [pathname]);

  const [sticky, setSticky] = useState("");

  // on render, set listener
  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, []);

  const isSticky = () => {
    /* Method that will fix header after a specific scrollable */
    const scrollTop = window.scrollY;
    const stickyClass = scrollTop >= 250 ? "is-sticky" : "";
    setSticky(stickyClass);
  };

  const classes = `    p-8
  z-20
  w-full
py-10
flex
flex-row-reverse
md:flex-row
justify-between
items-center
text-white
md:p-12
lg:py-8
font-inter
font-light
bg-purpleBlack 
bg-opacity-70
font-montS 
text-sm
fixed ${sticky}`;



  return (
    <>
      <header className={classes}>
        <NavLink to={"/"}>
          <img src="/holidaze_logo.svg" alt=" logo"></img>
        </NavLink>
        <div className="flex flex-row gap-6 md:gap-8 justify-center items-center ">
          <nav className="hidden md:flex">
            <ul className="flex flex-row gap-10 mr-10 ">
              <li className="hover:underline underline-offset-8">
                <NavLink to={"/products"}>All products</NavLink>
              </li>
              <li className="hover:underline underline-offset-8">
                {" "}
                <NavLink to={"/contact"}>Contact Us</NavLink>
              </li>
            </ul>
          </nav>
     

          <div className="relative md:hidden">
            <button
              className="flex justify-center"
              onClick={() => setMenu(!showMenu)}
            >
              <img src="/burger_menu.svg" alt="Hamburger menu icon" className=""></img>
            </button>
            {showMenu && (
              <div className="burger whitespace-nowrap bg-mainGrey border-2 flex justify-center border-mainBeige absolute top-12 -right-2 w-52 h-80 rounded-md z-20 shadow-lg transition ease-in-out delay-500 duration-2000">
                <nav className="flex flex-col gap-14 justify-center items-center w-full text-center">
                  <NavLink to={"/products"}>All products</NavLink>
                  <NavLink to={"/contact"}>Contact Us</NavLink>
                </nav>
              </div>
            )}
          </div>
        </div>
      </header>
          </>
  );
};

export default Header;
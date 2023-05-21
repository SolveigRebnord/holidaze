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

const menuItems = [{title: 'Home', link: '/'}, {title: 'Venues', link: 'venues'}];


  return (
    <>
      <header className={classes}>
        <NavLink to={"/"}>
          <img src="/holidaze_logo.svg" alt=" logo"></img>
        </NavLink>
        <div className="flex flex-row gap-6 md:gap-8 justify-end items-center w-full">
          <nav className="hidden md:flex">
          <ul className="flex flex-row gap-10 mr-10">
            {menuItems.map((item) => (
              <li className="hover:underline underline-offset-8">
                 <NavLink  to={item.link}>{item.title}</NavLink>
    
              </li>
            ))}
          </ul>
          </nav>

          <div className="relative w-full md:hidden">
            <button
              className="flex justify-center"
              onClick={() => setMenu(!showMenu)}
            >
              <img
                src="/burger_menu.svg"
                alt="Hamburger menu icon"
                className=""
              ></img>
            </button>
            {showMenu && (
              <div className="burger whitespace-nowrap bg-purpleBlack border-2 flex justify-center border-mainBeige absolute top-0 left-0 w-screen h-screen rounded-md z-20 shadow-lg transition ease-in-out delay-500 duration-2000">
                <nav className="flex flex-col gap-14 justify-center items-center w-full text-center">
                <ul className="w-full">
                  {menuItems.map((item) => (
                    <li className="hover:underline underline-offset-8 w-full">
                  <NavLink  to={item.link}>{item.title}</NavLink>
              </li>
            ))}
          </ul>
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

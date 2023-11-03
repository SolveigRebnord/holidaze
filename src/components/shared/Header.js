import { NavLink, json, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";
import { useState, useEffect, useRef } from "react";

const Header = () => {

  const [showMenu, setMenu] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  let username;
  let userlink;
  currentUser ? (username = currentUser.name) : (username = "Log In");
  currentUser ? (userlink = '/account') : (userlink = "/login");


  const { pathname } = useLocation();
  useEffect(() => {
    setIsComponentVisible(false);
  }, [pathname]);

  const [sticky, setSticky] = useState("");

  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, []);

  const isSticky = () => {
    const scrollTop = window.scrollY;
    const stickyClass = scrollTop >= 250 ? "is-sticky" : "";
    setSticky(stickyClass);
  };



  const classes = `    
  p-8
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
md:px-14
md:pr-16
font-inter
font-light
bg-purpleBlack 
bg-opacity-40
font-montS 
drop-shadow-md
text-sm
fixed ${sticky}`;

  const menuItems = [
    { title: "Venues", link: "venues" },
    { title: username , link: userlink },
  ];

  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <>
      <header className={classes}>
        <NavLink to={"/"}>
          <p className="w-40 text-xl text-right" >Holidaze</p>
        </NavLink>
        <div className="flex flex-row gap-6 md:gap-8 justify-end items-center w-full">
          <nav className="hidden md:flex">
            <ul className="flex flex-row gap-16 mr-4">
              {menuItems.map((item) => (
                <li
                key={item.title}
                className="hover:underline box-border relative underline-offset-8 last-of-type:after:content-img  last-of-type:after:absolute h-fit after:left-14 text-base ">
                  <NavLink to={item.link}>{item.title}</NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className=" w-full md:hidden">
            <button
              className="flex justify-center"
              onClick={() => setIsComponentVisible(true)}
            >
              <img
                src="/burger_menu.svg"
                alt="Hamburger menu icon"
                className=""
              ></img>
            </button>
            {isComponentVisible && (
              <div
                ref={ref}
                className="burger whitespace-nowrap bg-purpleBlack border-r-2 flex justify-center border-mainBeige absolute top-0 left-0 w-3/4 h-screen rounded-md z-40 shadow-lg transition ease-in-out delay-500 duration-2000"
              >
                <nav className="flex flex-col justify-center items-center w-full text-center">
                  <ul className="w-full flex flex-col gap-12 items-center">
                    {menuItems.map((item) => (
                <li className="hover:underline last-of-type:pr-4 relative underline-offset-8 last-of-type:after:content-img  last-of-type:after:absolute  h-fit   after:left-12  ">
                <NavLink to={item.link}>{item.title}</NavLink>
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

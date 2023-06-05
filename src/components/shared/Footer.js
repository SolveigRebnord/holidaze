import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../store/modules/AuthSlice";
const Footer = () => {
  const menuItems = [
    { title: "Home", link: "/" },
    { title: "Venues", link: "venues" },
    { title: "Profile", link: "account" },

  ];

  const dispatch = useDispatch()
  const { user: currentUser } = useSelector((state) => state.auth);


  return (
    <footer className="h-72 bg-passionOrange  p-4 lg:p-8 gap-14 lg:gap-0  flex flex-col justify-end items-center relative">
      <ul className="w-full flex flex-col gap-8 items-center justify-center lg:pb-8">
        {menuItems.map((item) => (
          <li className="hover:underline underline-offset-8 relative w-fit">
            <NavLink to={item.link}>{item.title}</NavLink>
          </li>
        ))}
      </ul>
      {currentUser && <button className="absolute" onClick={() => dispatch(logout())}>Log out</button>}
      <div className="lg:self-end flex flex-col items-center lg:items-end justify-end gap-2">
        <img src="/holidaze_logo.svg" />
        <p className="text-xs">@Sunny</p>
      </div>
    </footer>
  );
};

export default Footer;

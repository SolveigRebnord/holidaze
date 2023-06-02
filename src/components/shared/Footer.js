import { NavLink } from "react-router-dom";
const Footer = () => {
  const menuItems = [
    { title: "Home", link: "/" },
    { title: "Venues", link: "venues" },
    { title: "Profile", link: "account" },
  ];

  return (
    <footer className="h-72 bg-passionOrange mt-20 p-4 lg:p-8 gap-14 lg:gap-0 flex flex-col justify-end items-center">
      <ul className="w-full flex flex-col gap-8 items-center justify-center">
        {menuItems.map((item) => (
          <li className="hover:underline underline-offset-8 relative w-fit">
            <NavLink to={item.link}>{item.title}</NavLink>
          </li>
        ))}
      </ul>
      <div className="lg:self-end flex flex-col items-center lg:items-end justify-end gap-2">
        <img src="/holidaze_logo.svg" />
        <p className="text-xs">@Sunny</p>
      </div>
    </footer>
  );
};

export default Footer;

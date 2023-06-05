import { useLocation } from "react-router-dom";

const Hero = ({ img, text }) => {
  const location = useLocation();

  return (
    <section className="relative z-0">
      {location.pathname === "/" && (
        <img
          src={img}
          className={" min-w-full object-cover h-screen"}
        ></img>
      )}
      {location.pathname == "/account" && (
        <img
          src={img}
          className="h-[550px] md:h-[300px] md:min-w-full object-cover object-left"
        ></img>
      )}
      {location.pathname !== "/" && location.pathname !== "/account" && (
        <img src={img} className={"h-[300px] min-w-full object-cover object-bottom "}></img>
      )}

      <h1
        className={
          "uppercase absolute bottom-10 text-[40px] left-1/2 -translate-x-1/2 leading-none text-purpleBlack text-center font-passionOne"
        }
      >
        {text}
      </h1>
    </section>
  );
};

export default Hero;

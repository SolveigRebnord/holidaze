import { useLocation } from "react-router-dom";

const Hero = ({ img, text }) => {
  const location = useLocation();

  return (
    <section className="relative z-0 pt-72">

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

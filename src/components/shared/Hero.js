import { useLocation } from "react-router-dom";

const Hero = ({img, text}) => {

    const location = useLocation();

    return (     
        <section className="relative z-0 mb-12">
            {location.pathname === '/' &&
            <img
            src={img}
            className={"h-[600px] min-w-full object-cover  lg:h-screen"}
            ></img>}
             {location.pathname == '/account' &&
            <img
            src={img}
            className="h-[550px] md:h-[300px] md:min-w-full object-cover object-left"

            ></img>}
            {location.pathname !== '/' && location.pathname !== '/account' && 
             <img
            src={img}
            className={"h-[300px] min-w-full object-cover"}
            ></img>}
           
            <h1 className={ "uppercase absolute bottom-8 text-[40px] left-1/2 -translate-x-1/2 leading-none text-white text-center font-passionOne"}>
            {text}
            </h1>
        </section> 
    );
}
 
export default Hero;
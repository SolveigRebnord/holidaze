const Hero = ({img}) => {

    //gjøre h1 om til prop også
    return (     
        <section className="relative z-0">
            <img
            src={img}
            className="h-[600px] min-w-full object-cover lg:h-screen"
            ></img>
            <h1 className="font-passionOne uppercase absolute bottom-5 text-[52px] left-1/2 -translate-x-1/2 leading-none text-white text-center">
            Ready for your next adventure?
            </h1>
        </section> 
    );
}
 
export default Hero;
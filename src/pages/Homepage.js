const Homepage = () => {
    return ( <>
    <section className="relative z-0">
    <img src="/beach_hero.jpg" className="h-[600px] min-w-full object-cover lg:h-screen"></img>
    <h1 className="font-passionOne uppercase absolute bottom-5 text-[52px] left-1/2 -translate-x-1/2 leading-none text-white text-center">Ready for your next adventure?</h1>
    </section>
    <section className="mx-4 my-8 flex flex-col gap-6 md:mx-auto md:w-2/3 lg:hidden">
        <input className="bg-purpleBlack opacity-90 w-full h-16 rounded-md text-white shadow-md placeholder:italic font-montS placeholder:text-white px-6 " placeholder="Where are we going?">
        </input>
        <div className="flex flex-row gap-6 mx-6 md:mx-auto md:w-2/3 ">
            <div className="flex flex-row ">
            <input className="bg-purpleBlack opacity-90 w-full h-14 rounded-l-md text-white shadow-md placeholder:italic font-montS placeholder:text-white px-4 border-white border-r-2"></input>
        <input className="bg-purpleBlack opacity-90 w-full h-14 rounded-r-md text-white shadow-md placeholder:italic font-montS placeholder:text-white px-4 "></input>
            </div>
        <button className="bg-lightBeige p-1.5 px-6 text-sm uppercase font-bold rounded-md drop-shadow-md">Find venues</button>
        </div>

    </section>
    <section className="hidden text-sm lg:flex absolute flex-row lg:w-1/2  bottom-1/3 left-1/2 gap-2 -translate-x-1/2 bg-purpleBlack bg-opacity-90 p-2 rounded-md drop-shadow-lg">
        <input className="bg-transparent w-full h-14 rounded-md text-white tracking-wide font-montS placeholder:text-white px-6 focus:outline-none" placeholder="Where are we going?">
        </input>
        <div className="flex flex-row gap-6 mx-6 md:mx-auto md:w-2/3 ">
            <div className="flex flex-row ">
            <input className="bg-transparent w-24 h-14  text-white placeholder:italic font-montS placeholder:text-white px-4 border-white border-r-2 focus:outline-none"></input>
        <input className=" bg-transparent w-24 h-14  text-white placeholder:italic font-montS placeholder:text-white px-4 focus:outline-none"></input>
            </div>
        <button className="bg-lightBeige p-1.5 px-6 text-xs uppercase font-bold rounded-md drop-shadow-md">Find venues</button>
        </div>

    </section>
    </> );      

}
 
export default Homepage;
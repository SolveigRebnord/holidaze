const ShortAbout = () => {
    return ( 
        <section className="bg-purpleBlack text-white py-14 flex flex-col gap-10 mt-14 md:flex-row md:justify-evenly">
        <div className="flex flex-col items-center justify-center text-center gap-4">
          <img src="/airplane.svg"></img>
          <p>
            Free shipping over 499 NOK <br />
            Always free returns
          </p>
        </div>
        <div className="flex flex-col items-center justify-center text-center gap-4">
          <img src="/headset.svg"></img>
          <p>
            Get in touch, we want you <br /> to have the best experience
          </p>
        </div>
        <div className="flex flex-col items-center justify-center text-center gap-4">
          <img src="/recycle.svg"></img>
          <p>
            Our main goal is substaining <br /> an eco system for the next
            generation
          </p>
        </div>
      </section>
     );
}
 
export default ShortAbout;
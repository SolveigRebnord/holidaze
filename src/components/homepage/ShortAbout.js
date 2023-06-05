const ShortAbout = () => {
  return (
    <section className="bg-purpleBlack text-white py-24 flex flex-col gap-20 md:py-14 md:flex-row md:justify-evenly">
      <div className="flex flex-col items-center justify-center text-center gap-4">
        <img src="/check.svg"></img>
        <p>
          Verified Venue Managers <br />
           and reviews
        </p>
      </div>
      <div className="flex flex-col items-center justify-center text-center gap-4">
        <img src="/headset.svg"></img>
        <p>
          24/7 customer support <br /> For your whole stay
        </p>
      </div>
      <div className="flex flex-col items-center justify-center text-center gap-4">
        <img src="/globe.svg"></img>
        <p>
          Venues all around the world <br /> 59 countries and 5 continents
        </p>
      </div>
    </section>
  );
};

export default ShortAbout;

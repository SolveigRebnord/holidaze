import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getVenues } from "../store/modules/VenueSlice";

const Venues = () => {
  const dispatch = useDispatch();
  const { venues } = useSelector((state) => state.venues); 

  useEffect(() => {
    dispatch(getVenues());
  }, [dispatch]);

  const { user: currentUser } = useSelector((state) => state.auth);

 

  return (
    <>
      <section className="mx-10 md:mx-16 lg:mx-52 relative pt-32">
        {!currentUser &&  <span className="absolute w-full bg-red-300 top-0">Log in to find it all</span>}
        <div className="flex flex-row justify-between items-center mb-12">
          <h1 className="">All Products</h1>
        </div>
        <div className="flex flex-wrap justify-between lg:gap-14">
          {venues.map((venue) => (
            <div
              key={venue.id}
              className="mb-20 w-full md:w-fit p-4 rounded-md shadow-md border border-gray-200 md:p-0 md:border-none md:shadow-none "
            >
              <div className="relative">
                <img
                  src={venue.media}
                  alt={venue.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src="/no_image.png";
                  }}
                  className="w-full md:w-80 h-96 object-cover rounded-md lg:w-64 lg:h-80 md:p-2 md:border-2 border-gray-200 "
              
                />
              </div>

              <div className="mt-4 flex flex-col justify-end items-start gap-3">
                <div>
                  <p className="pTitle text-md text-gray-700">
                    <Link to={`/venues/${venue.id}`}>{venue.name} </Link>
                  </p>
                </div>
               
                  <p className="pPrize">
                    {venue.price} NOK
                  </p>
                

                <Link
                  to={`/venues/${venue.id}`}
                  className="w-full mx-auto my-2 "
                >
                  <button className="w-full bg-white text-mainBrown border-2 border-gray-100 shadow-md rounded-none py-3 px-0 md:rounded-sm md:py-2 hover:border-mainBrown hover:bg-mainBrown hover:text-white">
                    Go to product
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Venues;
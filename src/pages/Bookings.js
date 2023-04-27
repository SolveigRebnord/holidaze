import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBookings } from "../store/modules/BookingSlice";

const Bookings = () => {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.bookings); 

  useEffect(() => {
    dispatch(getBookings());
  }, [dispatch]);


  console.log(bookings)

  return (
    <>
      <section className="mx-10 md:mx-16 lg:mx-52 relative">
        <div>

        </div>
        <div className="flex flex-row justify-between items-center mb-12">
          <h1 className="">Bookings</h1>
        </div>
        <div className="flex flex-wrap justify-between lg:gap-14">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="mb-20 w-full md:w-fit p-4 rounded-md shadow-md border border-gray-200 md:p-0 md:border-none md:shadow-none "
            >
              <p>{booking.guests}</p>
              <p>{booking.venue.name}</p>


              <div className="mt-4 flex flex-col justify-end items-start gap-3">
                <div>
                  <p className="pTitle text-md text-gray-700 ">
                    <Link to={`/venues/${booking.id}`}>{booking.id} </Link>
                  </p>
                </div>
             
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Bookings;
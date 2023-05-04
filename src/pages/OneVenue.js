import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleVenue } from "../store/modules/VenueSlice";

const OneVenue = () => {


  const dispatch = useDispatch();
  const { singleVenue } = useSelector((state) => state.venues);
  let { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getSingleVenue(id));
    }
  }, [dispatch, id]);

  return (
    <>
    
      {singleVenue && (
        <section className="">
          <section className="relative z-0">
            <img src="/plants.jpg" className="h-[500px] min-w-full object-cover object-bottom lg:h-[300px]"></img>
            <h1 className="font-passionOne uppercase absolute bottom-8 text-[40px] left-1/2 -translate-x-1/2 leading-none text-white text-center">{singleVenue.name}</h1>
          </section>
          <section className="flex flex-row p-24">
            <div className="w-1/2">
              <div>
              {singleVenue.media && singleVenue.media.length >= 1 &&
                            <div
                                className="">
                                {singleVenue.media[0] &&
                                    <div className="">
                                        <img
                                            src={singleVenue.media[0]}
                                            alt=""
                                            className="w-12" loading="lazy"/>
                                    </div>}

                                {singleVenue.media[1] && singleVenue.media[2] &&
                                    <div className="">
                                        <div className="">
                                            <img
                                                src={singleVenue.media[1]}
                                                alt="Model wearing plain black basic tee."
                                                className="w-12 object-contain object-center"/>
                                        </div>
                                        <div className="">
                                            <img
                                                src={singleVenue.media[2]}
                                                alt="Model wearing plain gray basic tee."
                                                className="h-full w-12"/>
                                        </div>
                                    </div>
                                }
                                {singleVenue.media[3] &&
                                    <div
                                        className="">
                                        <img
                                            src={singleVenue.media[3]}
                                            alt="Model wearing plain white basic tee."
                                            className="h-full w-12 object-contain object-center"/>
                                    </div>
                                }
                            </div>
                        }
            </div>


            <div className="flex flex-col gap-4 mx-10 md:w-2/3 md:mx-auto md:flex-row md:justify-between lg:w-2/3  lg:flex-col lg:items-start lg:gap-20 lg:pb-16 w-1/2">
              <div className="flex flex-col gap-2">
                <h1 className="font-semibold text-2xl">
                  {singleVenue.name}
                </h1>
                <p className="">{singleVenue.description}</p>
              </div>
              <div className="flex flex-col gap-6">
                 <p className="pPrize">
                    {singleVenue.price} NOK
                  </p>
              </div>
            </div>
              </div>
    
            
            <section className="mx-6 md:w-2/3 md:mx-auto lg:w-1/2  bg-purpleBlack p-4 flex flex-col gap-4">
          <div>
            <div className="flex flex-row justify-between items-center uppercase">
              <h2 className="text-white font-semibold tracking-wide font-passionOne ">Booking</h2>
              <button className="bg-white px-4 py-1 uppercase font-bold text-sm h-fit w-fit">Edit</button>
            </div>
          </div>
            <form className="bg-white p-2 font-montS text-sm text-black">
              <div className="flex flex-row justify-between items-center p-2">
                <input className="w-1/2 " placeholder="24.april-25.april"></input>
                <input className="w-1/2 text-right " placeholder="2 guests"></input>
              </div>
              <hr className="bg-black my-2"></hr>
              <input className="p-2 w-full text-right" placeholder="Oklahoma, United States"></input>
            </form>
        </section>
            
          </section>

    
      
      
  
        </section>
      )}
    </>
  );
};

export default OneVenue;

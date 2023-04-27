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
        <div className="m-auto flex flex-col gap-6 ">
          <div className="lg:flex flex-col-reverse lg:items-end lg:w-1/2 lg:mx-auto lg:gap-12">
            <div className="mx-10 md:m-auto lg:w-full lg:mx-0 md:w-2/3 md:mb-6 lg:mb-0">
            {singleVenue.media && singleVenue.media.length >= 1 &&
                            <div
                                className="">
                                {singleVenue.media[0] &&
                                    <div className="">
                                        <img
                                            src={singleVenue.media[0]}
                                            alt=""
                                            className="" loading="lazy"/>
                                    </div>}

                                {singleVenue.media[1] && singleVenue.media[2] &&
                                    <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                                        <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
                                            <img
                                                src={singleVenue.media[1]}
                                                alt="Model wearing plain black basic tee."
                                                className="h-full w-full object-contain object-center"/>
                                        </div>
                                        <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
                                            <img
                                                src={singleVenue.media[2]}
                                                alt="Model wearing plain gray basic tee."
                                                className="h-full w-full object-contain object-center"/>
                                        </div>
                                    </div>
                                }
                                {singleVenue.media[3] &&
                                    <div
                                        className="aspect-w-4 aspect-h-5 sm:overflow-hidden sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4">
                                        <img
                                            src={singleVenue.media[3]}
                                            alt="Model wearing plain white basic tee."
                                            className="h-full w-full object-contain object-center"/>
                                    </div>
                                }
                            </div>
                        }
            </div>

            <div className="flex flex-col gap-4 mx-10 md:w-2/3 md:mx-auto md:flex-row md:justify-between lg:w-2/3  lg:flex-col lg:items-start lg:gap-20 lg:pb-16">
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
      
        </div>
      )}
    </>
  );
};

export default OneVenue;

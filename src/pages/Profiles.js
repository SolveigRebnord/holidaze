import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProfiles } from "../store/modules/ProfilesSlice";

const Profiles = () => {
  const dispatch = useDispatch();
  const { profiles } = useSelector((state) => state.profiles);

  useEffect(() => {
    dispatch(getProfiles());
  }, [dispatch]);

  console.log(profiles);

  return (
    <>
      <section className="mx-10 md:mx-16 lg:mx-52 relative">
        <div></div>
        <div className="flex flex-row justify-between items-center mb-12">
          <h1 className="">Profiles</h1>
        </div>
        <div className="flex flex-wrap justify-between lg:gap-14">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="mb-20 w-full md:w-fit p-4 rounded-md shadow-md border border-gray-200 md:p-0 md:border-none md:shadow-none "
            >
              <p>{profile.email}</p>
              <p>{profile.name}</p>

              <div className="mt-4 flex flex-col justify-end items-start gap-3">
                <div>
                  <p className="pTitle text-md text-gray-700 ">
                    <Link to={`/profiles/${profile.name}`}>
                      {profile.name}{" "}
                    </Link>
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

export default Profiles;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUser, getSingleUser } from "../Redux/Slices/AdminAuthSlice";
import { InlineWidget } from "react-calendly";
import { Link } from "react-router-dom";
import { MorphingText } from "@/Components/magicui/morphing-text";

const AllUsers = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth?.allusers);

  useEffect(() => {
    dispatch(fetchAllUser());
  }, [dispatch]);

  const [popup, setPopUp] = useState(false);
  const [mySingleUser, setSingleUser] = useState();
  const handleGetSingleUser = async (id, e) => {
    e.preventDefault();
    setPopUp(true);

    const response = await dispatch(getSingleUser(id));
    setSingleUser(response?.payload?.singleUser);
    setPopUp(true);
  };

  const texts = [
    "Hello",
    "Morphing",
    "Text",
    "Animation",
    "React",
    "Component",
    "Smooth",
    "Transition",
    "Engaging",
  ];

  return (
    <>
      <div className=" pt-10" id="user">
        <div className="bg-white w-1/2 h-0.5 rounded-full mx-auto mb-10"></div>
        <h1 className="myfont bg-clip-text text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center text-2xl md:text-6xl text-black">
          Book Free <span className="text-[#ff014f]">Consultation</span>
          {/* <MorphingText texts={texts} /> */}
        </h1>

        <p className="text-center text-gray-100 mx-4 md:mx-40 mt-4">
          Connect with experienced professionals from various fields and gain
          valuable insights. Book a free consultation and take the next step in
          your journey with expert guidance.
        </p>
        <div className="grid  md:grid-cols-3 pb-10  gap-x-4 px-10 md:px-20">
          {user.map((myuser, index) => (
            <article
              key={index}
              className="relative isolate flex flex-col h-96 justify-end overflow-hidden rounded-md border border-black border-2  px-8 pb-8 pt-40 w-full mx-auto mt-8 md:mt-24"
            >
              <img
                src={myuser?.avatar?.secure_url}
                alt="University of Southern California"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
              <h3 className="z-10 mt-3 text-3xl font-bold text-white">
                {myuser?.fullName}
              </h3>
              <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                <p
                  onClick={(e) => {
                    handleGetSingleUser(myuser?._id, e);
                  }}
                  className="mt-2 underline  cursor-pointer"
                >
                  view
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {popup && (
        <>
          <div
            id="default-modal"
            tabindex="-1"
            aria-hidden="true"
            className=" overflow-y-auto overflow-x-hidden fixed flex justify-center shadow-xl top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div className="relative p-4 w-full max-w-xl max-h-full">
              <div className="relative bg-white rounded-lg shadow-sm ">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t  border-gray-200">
                  <img
                    src={mySingleUser?.avatar?.secure_url}
                    className="w-10 h-10 rounded-full object-cover mr-2"
                    alt=""
                  />
                  <h3 className="text-xl font-semibold text-gray-900 ">
                    {mySingleUser?.fullName}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setPopUp(false)}
                    className="text-gray-400 cursor-pointer bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  "
                    data-modal-hide="default-modal"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>

                <div className="p-4 md:p-5 space-y-4">
                  <p className="text-base leading-relaxed text-gray-500 ">
                    {mySingleUser?.about}
                  </p>
                </div>
                <div className="flex w-full items-center p-4 md:p-5 border-t border-gray-200 rounded-b ">
                  <Link
                    to="/book-consultation"
                    state={{ url: mySingleUser?.calendlyUrl }}
                    data-modal-hide="default-modal"
                    type="button"
                    className="text-white  w-full mybg  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center   dark:focus:ring-blue-800"
                  >
                    <p>Book Consultation</p>
                  </Link>
                  {/* <button
                    data-modal-hide="default-modal"
                    type="button"
                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700     "
                  >
                    Decline
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AllUsers;

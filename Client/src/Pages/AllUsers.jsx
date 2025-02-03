import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUser, getSingleUser } from "../Redux/Slices/AdminAuthSlice";
import { InlineWidget } from "react-calendly";
import { Link } from "react-router-dom";

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

  return (
    <>
      <div className=" min-h-screen">
        <nav className="flex py-4 px-4 " aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
              <Link
               to={'/'}
                className="inline-flex items-center text-sm font-medium text-[#2c7f75] hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3 me-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <a
                  href="#"
                  className="ms-1 text-sm font-medium text-[#2c7f75] hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                >
                  All Users
                </a>
              </div>
            </li>
          </ol>
        </nav>

        <h1 className="mainfont text-center font-serif  text-2xl md:text-6xl text-black">
          Book Free Consultation
        </h1>
        <div className="w-60 mb-4 h-1 bg-[#2c7f75] mx-auto"></div>
        <p className="text-center text-gray-800 mx-4 md:mx-40 mt-1">
        Connect with experienced professionals from various fields and gain valuable insights. Book a free consultation and take the next step in your journey with expert guidance.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4  gap-x-4 px-10 md:px-20">
          {user.map((myuser, index) => (
            <article
              key={index}
              class="relative isolate flex flex-col justify-end overflow-hidden rounded-md border border-black border-2  px-8 pb-8 pt-40 w-full mx-auto mt-8 md:mt-24"
            >
              <img
                src={myuser?.avatar?.secure_url}
                alt="University of Southern California"
                class="absolute inset-0 h-full w-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
              <h3 class="z-10 mt-3 text-3xl font-bold text-white">
                {myuser?.fullName}
              </h3>
              <div class="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
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
            class=" overflow-y-auto overflow-x-hidden fixed flex justify-center shadow-xl top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div class="relative p-4 w-full max-w-xl max-h-full">
              <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                  <img
                    src={mySingleUser?.avatar?.secure_url}
                    className="w-10 h-10 rounded-full object-cover mr-2"
                    alt=""
                  />
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    {mySingleUser?.fullName}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setPopUp(false)}
                    class="text-gray-400 cursor-pointer bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="default-modal"
                  >
                    <svg
                      class="w-3 h-3"
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
                    <span class="sr-only">Close modal</span>
                  </button>
                </div>

                <div class="p-4 md:p-5 space-y-4">
                  <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    {mySingleUser?.about}
                  </p>
                </div>
                <div class="flex w-full items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <Link
                  to="/book-consultation" state={{ url: mySingleUser?.calendlyUrl }}
                    data-modal-hide="default-modal"
                    type="button"
                    class="text-white  w-full bg-[#2c7f75]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <p>Book Consultation</p>
                  </Link>
                  {/* <button
                    data-modal-hide="default-modal"
                    type="button"
                    class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
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

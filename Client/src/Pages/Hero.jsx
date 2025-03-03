import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import heroimg from "../assets/heroimg.png";
import { BackgroundBeams } from "../Components/ui/background-beams";
import { useDispatch, useSelector } from "react-redux";
import { enquireFrom, fetchAllUser } from "@/Redux/Slices/AdminAuthSlice";
import { TypewriterEffectSmooth } from "../Components/ui/typewriter-effect";
import hands from "../assets/hands.gif";
import Snowfall from "react-snowfall";
import logo from "../assets/logo.png";
const Hero = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth?.allusers);
  const user1 = user[0];
  console.log(user1);
  useEffect(() => {
    dispatch(fetchAllUser());
  }, [dispatch]);
  console.log(user);

  const words = [
    {
      text: " Meet ",
      className:
        "myfont text-3xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 ",
    },
    {
      text: " our ",
      className:
        "myfont bg-clip-text text-3xl md:text-7xl text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600",
    },
    {
      text: " industry ",
      className:
        "myfont text-3xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600",
    },
    {
      text: " expert ",
      className: " myfont text-[#ff014f] text-3xl md:text-7xl ",
    },
  ];

  const [popup, setPopUp] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEnquireForm = async (e) => {
    e.preventDefault()
    try {
      const response = await dispatch(enquireFrom(formData));
      setPopUp(false)
      setFormData({
        fullName :"",
        email :"",
        phone:"",
        description:""
      })
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="h-[40rem] w-full rounded-md  relative flex flex-col items-center justify-center antialiased">
        <div className="max-w-5xl mx-auto flex flex-col items-center p-4">
          <img
            src={logo}
            alt=""
            className="size-40 left-4 absolute top-4 rounded-full shadow-xl"
          />
          <img className="size-40 -mb-10" src={hands} alt="" />
          <h1 className="relative z-10   bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
            <TypewriterEffectSmooth words={words} />
          </h1>
          <p></p>
          <p className="text-neutral-100 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
            Connect with experienced professionals from various fields and gain
            valuable insights. Book a free consultation and take the next step
            in your journey with expert guidance.
          </p>

          <div className="space-x-4 z-20 cursor-pointer text-white flex justify-center mt-4 items-center cursor-pointer">
            <a
              onClick={() => setPopUp(true)}
              className="bg-white z-20 text-black w-fit px-4 md:px-10 shadow-xl py-3 cursor-pointer"
            >
              Register Now
            </a>
            <a
              href="#user"
              className="cursor-pointer z-20  bg-[#ff014f] text-white w-fit shadow-xl px-4 md:px-10 py-3"
            >
              Explore More
            </a>
          </div>
        </div>

        <img
          src="https://www.shutterstock.com/image-vector/human-resources-selfdevelopment-modern-business-260nw-185422997.jpg"
          alt=""
          className="md:block hidden  broder border-2 border-dotted p-2 border-[#ff014f] rounded-full size-20 md:size-40 absolute bottom-20 left-20 text-white animate-pulse"
        />
        <img
          src="https://thumbs.dreamstime.com/b/businessman-expert-sign-37086893.jpg"
          alt=""
          className="md:block hidden   broder border-2 border-dotted p-2 border-[#ff014f] rounded-full size-20 md:size-40 absolute bottom-20 md:bottom-40 right-20 text-white animate-pulse"
        />
        <img
          className="z-[-000] absolute left-0"
          src="https://themes-park.net/landing/reeni-html/assets/images/others/shape-01.png"
          alt=""
        />
        <div>
          <Snowfall color="#ff014f" snowflakeCount={10} />
        </div>
        <BackgroundBeams />
      </div>

      {popup && (
        <>
          <div className="fixed h-screen z-[1000000000000000000000000000000000000000000000]">
            <div className=" overflow-y-auto overflow-x-hidden fixed flex justify-center shadow-xl top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
              <div class="relative  max-w-xl mx-auto mt-16 flex w-full flex-col border rounded-lg bg-white p-8">
                <h2 class="title-font mb-1 text-lg font-medium text-gray-900">
                  Enquiry Form
                </h2>

                <p className="absolute right-5 text-2xl top-3 cursor-pointer" onClick={()=> setPopUp(false)}>x</p>
                <form onSubmit={handleEnquireForm}>
                  <div className="flex gap-x-2">
                    <div class="mb-4">
                      <label
                        for="email"
                        class="text-sm leading-7 text-gray-600"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        onChange={handleInputChange}
                        value={formData.fullName}
                        placeholder="Enter your Full Name "
                        class="w-full rounded border border-gray-300 bg-white py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                      />
                    </div>
                    <div class="mb-4">
                      <label
                        for="email"
                        class="text-sm leading-7 text-gray-600"
                      >
                        Email
                      </label>
                      <input
                        type="text"
                        id="email"
                        name="email"
                        onChange={handleInputChange}
                        value={formData.email}
                        placeholder="Enter your email "
                        class="w-full rounded border border-gray-300 bg-white py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                      />
                    </div>
                  </div>

                  <div class="mb-4">
                    <label for="email" class="text-sm leading-7 text-gray-600">
                      Phone
                    </label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      onChange={handleInputChange}
                      value={formData.phone}
                      placeholder="Enter your Full Name "
                      class="w-full rounded border border-gray-300 bg-white py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    />
                  </div>
                  <div class="mb-4">
                    <label
                      for="message"
                      class="text-sm leading-7 text-gray-600"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      onChange={handleInputChange}
                      value={formData.description}
                      class="h-32 w-full resize-none rounded border border-gray-300 bg-white py-1 px-3 text-base leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    ></textarea>
                  </div>
                  <button  type="submit" class="w-full cursor-pointer rounded border-0 bg-black py-2 px-6 text-lg text-white  focus:outline-none">
                    Send
                  </button>
                </form>
                <p class="mt-3 text-xs text-gray-500">
                  Feel free to connect with us on social media platforms.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Hero;

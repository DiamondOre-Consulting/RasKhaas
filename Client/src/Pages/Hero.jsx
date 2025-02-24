import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import heroimg from "../assets/heroimg.png";
import { BackgroundBeams } from "../Components/ui/background-beams";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUser } from "@/Redux/Slices/AdminAuthSlice";
import { TypewriterEffectSmooth } from "../Components/ui/typewriter-effect";
import hands from "../assets/hands.gif";
import Snowfall from "react-snowfall";

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

  return (
    <>
      <div className="h-[40rem] w-full rounded-md  relative flex flex-col items-center justify-center antialiased">
        <div className="max-w-5xl mx-auto flex flex-col items-center p-4">
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
              target="_blank"
              href="https://wa.me/919811839410?text=Hello i want to register myself on Raskhas"
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
          className="  broder border-2 border-dotted p-2 border-[#ff014f] rounded-full size-20 md:size-40 absolute top-10 left-20 text-white animate-pulse"
        />
        <img
          src="https://thumbs.dreamstime.com/b/businessman-expert-sign-37086893.jpg"
          alt=""
          className="  broder border-2 border-dotted p-2 border-[#ff014f] rounded-full size-20 md:size-40 absolute bottom-10 md:bottom-40 right-20 text-white animate-pulse"
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
    </>
  );
};

export default Hero;

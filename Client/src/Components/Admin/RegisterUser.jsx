import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUserByAdmin } from "../../Redux/Slices/AdminAuthSlice";
import { BsPersonCircle, BsPersonFill } from "react-icons/bs";
const RegisterUser = () => {
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    about: "",
    calendlyUrl: "",
    avatar: "",
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const getImage = (event) => {
    event.preventDefault();

    const uploadedImg = event.target.files[0]; 

    if (uploadedImg) {
      setFormData({
        ...formData,
        avatar: uploadedImg,
      });

    
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImg);
      fileReader.onloadend = () => {
        setImage(fileReader.result);
      };
    }
  };

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const myformData = new FormData();
      myformData.append("fullName", formData.fullName);
      myformData.append("phone", formData.phone);
      myformData.append("email", formData.email);
      myformData.append("about", formData.about);
      myformData.append("calendlyUrl", formData.calendlyUrl);
      myformData.append("avatar", formData.avatar);

      const response = await dispatch(registerUserByAdmin(myformData));
      // console.log(response);

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        about: "",
        calendlyUrl: "",
        avatar: "",
      })
        

      
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center ">
        <div className="relative py-3 min-w-xl sm:mx-auto">
          <div className="min-h-96 px-8 py-6 mt-4 text-left bg-white  rounded-xl shadow-lg">
            <form onSubmit={registerUser}>
              <div className="flex flex-col justify-center items-center h-full select-none">
                <div className="flex flex-col items-center justify-center gap-2 mb-8">
                  <p className="m-0 text-[20px] font-semibold ">
                    Register User
                  </p>
                </div>

                {/* Full Name Field */}
                <div className="flex w-full gap-x-2">
                  <div className="w-full flex flex-col gap-2">
                    <label className="font-semibold text-xs text-gray-400">
                      Full Name
                    </label>
                    <input
                      value={formData.fullName}
                      name="fullName"
                      onChange={handleInputChange}
                      className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none  "
                      placeholder="Full Name"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="w-full flex flex-col gap-2">
                    <label className="font-semibold text-xs text-gray-400">
                      Email
                    </label>
                    <input
                      value={formData.email}
                      name="email"
                      type="email"
                      onChange={handleInputChange}
                      className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none  "
                      placeholder="Email"
                    />
                  </div>
                </div>

                <div className="flex w-full gap-x-2">
                  <div className="w-full flex flex-col gap-2">
                    <label className="font-semibold text-xs text-gray-400">
                      Phone
                    </label>
                    <input
                      value={formData.phone}
                      name="phone"
                      onChange={handleInputChange}
                      className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none  "
                      placeholder="phone"
                    />
                  </div>
                </div>

                <div className="w-full flex  gap-2">
                  {image ? (
                    <img
                      src={image}
                      alt=""
                      className="w-[3.8rem] h-[3.8rem] border-[2px] border-[#FFB827] rounded-full"
                    />
                  ) : (
                    <BsPersonCircle className="w-[3.8rem] h-[3.8rem]" />
                  )}

                  <div className="flex flex-col w-full">
                    <label className="font-semibold text-xs text-gray-400">
                      Choose file
                    </label>
                    <input
                      name="avatar"
                      type="file"
                      onChange={getImage} // Corrected onChange handler
                      className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none  "
                    />
                  </div>
                </div>

                <div className="w-full flex flex-col gap-2">
                  <label className="font-semibold text-xs text-gray-400">
                    Clendly url
                  </label>
                  <input
                    value={formData.calendlyUrl}
                    name="calendlyUrl"
                    type="url"
                    onChange={handleInputChange}
                    className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none  "
                    placeholder="calendlyUrl"
                  />
                </div>

                <div className="w-full flex flex-col gap-2">
                  <label className="font-semibold text-xs text-gray-400">
                    About
                  </label>
                  <textarea
                    rows={3}
                    value={formData.about}
                    name="about"
                    onChange={handleInputChange}
                    className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none  "
                    placeholder="about"
                  />
                </div>

                {/* Submit Button */}
                <div className="mt-5 w-full">
                  <button
                    type="submit"
                    className="py-2 px-8 bg-[#2c7f75] hover:bg-blue-800 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg cursor-pointer"
                  >
                    Register
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;

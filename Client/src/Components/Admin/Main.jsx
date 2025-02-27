import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteUser,
  getSingleUser,
  updateUser,
} from "../../Redux/Slices/AdminAuthSlice";
import { BsPersonCircle, BsPersonFill } from "react-icons/bs";
import { searching } from "../../Redux/Slices/AdminAuthSlice";
import { debounce } from "lodash";
import Editor from "./Editor";
const Main = ({ user }) => {
  const dispatch = useDispatch();
  const [deletepopup, setDeletePopUp] = useState(false);
  const [seletedid, useSelectedId] = useState();

  const handledeleteUser = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(deleteUser(seletedid));

      if (response.payload.success) {
        setDeletePopUp(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [mySingleUser, setSingleUser] = useState();
  const handleGetSingleUser = async (id, e) => {
    e.preventDefault();
    setEditUserPopUp(true);

    const response = await dispatch(getSingleUser(id));

    setSingleUser(response?.payload?.singleUser);
  };

  const [image, setImage] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    about: "",
    calendlyUrl: "",
    avatar: "",
  });

  useEffect(() => {
    if (mySingleUser) {
      setFormData({
        fullName: mySingleUser.fullName || "",
        email: mySingleUser.email || "",
        phone: mySingleUser.phone || "",
        about: mySingleUser.about || "",
        calendlyUrl: mySingleUser.calendlyUrl || "",
        avatar: mySingleUser.avatar || "",
      });
    }
  }, [mySingleUser]);

  //   console.log(formData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function imgUpload(e) {
    e.preventDefault();
    const uploadedImg = e.target.files[0];

    if (uploadedImg) {
      setFormData({
        ...formData,
        avatar: uploadedImg, 
      });

      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImg);
      fileReader.onload = function () {
        setImage(fileReader.result);
      };
    }
  }

  function handleUpdateProfile(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const [edituserpopup, setEditUserPopUp] = useState(false);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const myformData = new FormData();
      myformData.append("fullName", formData.fullName);
      myformData.append("phone", formData.phone);
      myformData.append("email", formData.email);
      myformData.append("about", formData.about);
      myformData.append("calendlyUrl", formData.calendlyUrl);
      myformData.append("avatar", formData.avatar);

      const response = await dispatch(
        updateUser({ id: seletedid, data: myformData })
      );

      if (response.payload.success) {
        setEditUserPopUp(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [searchText, setSearchText] = useState("");
  const [filterdata, setFilterData] = useState(null);
  console.log(searchText);
  const handleSearch = debounce(async () => {
    if (searchText.trim()) {
      const response = await dispatch(searching({ searchText }));
      setFilterData(response?.payload?.user);
      console.log("data is main", response.data);
    }
    else {
      setFilterData(null); 
    }
  }, 500);

  useEffect(() => {
    handleSearch();
  }, [searchText]);

  console.log("myfiltered data ", filterdata);

  return (
    <div className="">
      <form className="w-full mb-10 w-full px-2">
        <div className="relative">
          <input
            type="text"
            name="search"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            className="w-full border-[#2c7f75] border h-12 shadow p-4 rounded-full"
            placeholder="Search..."
          />
          <button type="submit">
            <svg
              className="text-teal-400 h-5 w-5 absolute top-3.5 right-3 fill-current "
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              version="1.1"
              x="0px"
              y="0px"
              viewBox="0 0 56.966 56.966"
            >
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"></path>
            </svg>
          </button>
        </div>
      </form>

      {/* <div className="p-4 sm:ml-62"> */}

      <div className="space-y-4">
      {(filterdata !== null ? filterdata : user)?.map((myuser, index) => (
          <div
            className=" shadow-md flex justify-between items-center  border border-gray-600 w-full py-3 px-6  rounded-full"
            key={index}
          >
            <img
              src={myuser?.avatar?.secure_url}
              className="w-10 h-10 rounded-full"
              alt=""
            />
            <p> {myuser?.fullName}</p>
            <p> {myuser?.email}</p>
            <p> {myuser?.phone}</p>
            <p
              className="bg-yellow-300 px-6 py-2 text-sm  cursor-pointer rounded-full cursor-pointer"
              onClick={(e) => {
                useSelectedId(myuser?._id);
                handleGetSingleUser(myuser?._id, e);
              }}
            >
              Edit
            </p>

            <p
              className="bg-red-400 px-4 text-sm py-2 cursor-pointer  rounded-full text-gray-100"
              onClick={() => {
                useSelectedId(myuser?._id);
                setDeletePopUp(true);
              }}
            >
              Delete
            </p>
          </div>
        ))}
      </div>

      {deletepopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur confirm-dialog ">
          <div className="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
            <div className=" opacity-25 w-full h-full absolute z-10 inset-0"></div>
            <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative shadow-lg">
              <div className="md:flex items-center">
                <div className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                  <i className="bx bx-error text-3xl">&#9888;</i>
                </div>
                <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                  <p className="font-bold">Warning!</p>
                  <p className="text-sm text-gray-700 mt-1">
                    Are you sure you want to delete this user!
                  </p>
                </div>
              </div>
              <div className="text-center md:text-right mt-4 md:flex md:justify-end">
                <button
                  onClick={(e) => {
                    handledeleteUser(e);
                  }}
                  className="block cursor-pointer w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
                >
                  Delete
                </button>
                <button
                  onClick={() => setDeletePopUp(false)}
                  className="block w-full cursor-pointer  md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4 md:mt-0 md:order-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {edituserpopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur confirm-dialog ">
          <div className="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
            <div className=" opacity-25 w-full h-full absolute z-10 inset-0"></div>
            <div className="bg-white rounded-lg px-8 md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative shadow-lg">
              <p
                className="float-right text-2xl cursor-pointer"
                onClick={() => setEditUserPopUp(false)}
              >
                x
              </p>
              <form onSubmit={handleUpdateUser}>
                <div className="flex flex-col justify-center items-center h-full select-none">
                  <div className="flex flex-col items-center justify-center gap-2 mb-8">
                    <p className="m-0  text-[20px] font-semibold ">
                      Update User
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
                        value={formData?.email}
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
                        value={formData?.phone}
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
                        onChange={imgUpload} // Corrected onChange handler
                        className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none  "
                      />
                    </div>
                  </div>

                  <div className="w-full flex flex-col gap-2">
                    <label className="font-semibold text-xs text-gray-400">
                      Clendly url
                    </label>
                    <input
                      value={formData?.calendlyUrl}
                      name="calendlyUrl"
                      type="text"
                      onChange={handleInputChange}
                      className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none  "
                      placeholder="calendlyUrl"
                    />
                  </div>

                  <div className="w-full flex flex-col gap-2">
                    <label className="font-semibold text-xs text-gray-400">
                      About
                    </label>
                    {/* <textarea
                      rows={3}
                      value={formData?.about}
                      name="about"
                      onChange={handleInputChange}
                      className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none  "
                      placeholder="about"
                    /> */}

                    <Editor data={formData?.about} change={handleInputChange}/>
                  </div>

                  {/* Submit Button */}
                  <div className="mt-1 w-full">
                    <button
                      type="submit"
                      className="py-2  bg-[#2c7f75] hover:bg-blue-800 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg cursor-pointer"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;

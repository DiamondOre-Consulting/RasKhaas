import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/Slices/AdminAuthSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fromdata, setFormData] = useState({
    email: "",
    password: "",
  });

  

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...fromdata,
      [name]: value,
    });
  };

  const LoginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(login(fromdata));
   
      if (response?.payload?.success) {
        navigate("/admin-dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="w-screen min-h-screen flex items-center justify-center bg-gray-50  px-4 sm:px-6 lg:px-8">
        <div className="relative py-3 sm:max-w-xs sm:mx-auto">
          <div className="min-h-96 px-8 py-6 mt-4 text-left bg-white w-96  rounded-xl shadow-lg">
            <form onSubmit={LoginUser}>
              <div className="flex flex-col  justify-center items-center h-full select-none">
                <div className="flex flex-col items-center justify-center gap-2 mb-8">
                 
                  <p className="m-0 text-2xl uppercase font-semibold ">
                    Admin Login
                  </p>
                 
                </div>

                <div className="w-full flex flex-col gap-2">
                  <label className="font-semibold text-sm text-gray-800 ">
                    Email
                  </label>
                  <input
                    value={fromdata.email}
                    name="email"
                    onChange={handleInput}
                    className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none  "
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="w-full flex flex-col gap-2">
                <label className="font-semibold text-sm text-gray-800 ">
                  Password
                </label>
                <input
                  value={fromdata.password}
                  name="password"
                  onChange={handleInput}
                  type="password"
                  className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none  "
                  placeholder="••••••••"
                />
              </div>
              <div className="mt-5">
                <button className="py-1 px-8 bg-blue-500 hover:bg-blue-800 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg cursor-pointer select-none">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import { getEnquiryForms } from "@/Redux/Slices/AdminAuthSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const AllEnqueryForm = () => {
  const dispatch = useDispatch();
  const [allForms, setAllForms] = useState([]);

  const getData = async ()=>{
      try{
        const response = await dispatch(getEnquiryForms())
        console.log("all data ",response)
        setAllForms(response?.payload?.enquireForm)
      }
      catch(e){
          console.log(e)
      }
  }
  useEffect(() => {
    getData()
    
  }, [dispatch]);

  return (
   
    <div className="grid grid-cols-3 pb-10 gap-x-4  gap-y-6 ">
      {allForms.length > 0 ? (
        allForms.map((ele) => (
          <div
            key={ele.id}
            className="relative  border-gray-800  dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px]"
          >
            <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
            <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
            <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
            <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
            <div className="text-wrap  flex flex-col  space-y-4 text-2xl overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800 flex items-center justify-center text-black dark:text-white">
              <div className="px-20 flex flex-col justify-start items-center ">
              <img
                src="https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png"
                className="w-28  rounded-full"
                alt=""
              />
              <p>{ele.fullName}</p>
              <p className="text-sm text-wrap ">{ele.email}</p>
              <p className="text-lg">{ele.phone}</p>
              <p className="text-sm float-left  mt-4">{ele.description}</p>
          
                </div>
            
            </div>
          </div>
        ))
      ) : (
        <p className="text-center col-span-4 text-gray-500">
          No enquiry forms available.
        </p>
      )}
    </div>
  );
};

export default AllEnqueryForm;

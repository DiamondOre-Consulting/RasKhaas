import React from "react";
import { InlineWidget } from "react-calendly";
import { useLocation } from "react-router-dom";

const BookConsultation = () => {
  const location = useLocation();
 console.log("myurl",location)
 const  url = location?.state?.url
  return (
    <div>
      <>
        <div className="flex items-center justify-center w-full bg-gray-200">
        
          <InlineWidget
            styles={{
              height: "1000px",
              padding: "10px",
              maxWidth: "1500px",
              width: "96vw",
            }}
            pageSettings={{
              backgroundColor: "fff",
              hideEventTypeDetails: false,
              hideLandingPageDetails: false,
              primaryColor: "2A4CFF",
              textColor: "040D43",
            }}
            url={url}
          />
        </div>
      </>
    </div>
  );
};

export default BookConsultation;

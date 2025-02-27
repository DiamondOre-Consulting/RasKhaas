import React, { useState } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

const Editor = ({ data, change }) => {
  const [content, setContent] = useState(data);

  const handleChange = (content) => {
    setContent(content);
    change({ target: { name: "about", value: content } }); // 
  };

  return (
    <div>
      <p> About </p>
      <SunEditor                       dangerouslySetInnerHTML={{ __html: content}}  setContents={content} onChange={handleChange} />
    </div>
  );
};

export default Editor;

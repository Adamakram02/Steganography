import React, { useRef } from "react";

const Buttonfile = ({ text, onFileChange }) => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      onFileChange(imageUrl);
    }
  };

  return (
    <div>
      <button
        className="button-upload"
        style={{ background: "#1dc257" }}
        onClick={handleButtonClick}
      >
        {text}
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/bmp"
        style={{ display: "none" }}
      />
    </div>
  );
};

export default Buttonfile;

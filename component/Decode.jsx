import React, { useState } from "react";
import Buttonfile from "./Buttonfile";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";

const Decode = () => {
  const [img, setImage] = useState("");
  const [lsb, setLsb] = useState(1);
  const [extractedText, setExtractedText] = useState("");
  const navigate = useNavigate();

  const handleImage = (imageUrl) => {
    setImage(imageUrl);
    setExtractedText("");
  };

  const clearImage = () => {
    setImage("");
    setExtractedText("");
  };

  const extractText = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const image = new Image();

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);

      let binaryText = "";
      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const { data } = ctx.getImageData(x, y, 1, 1);
          binaryText += extractBits(data[0], lsb);
          binaryText += extractBits(data[1], lsb);
          binaryText += extractBits(data[2], lsb);
        }
      }

      setExtractedText(binaryToString(binaryText));
    };

    if (img) {
      image.src = img;
    }
  };

  const extractBits = (colorComponent, lsbCount) => {
    let bits = "";
    for (let i = 0; i < lsbCount; i++) {
      bits += (colorComponent >> (lsbCount - i - 1)) & 1;
    }
    return bits;
  };

  const binaryToString = (binaryText) => {
    let text = "";
    for (let i = 0; i + 7 < binaryText.length; i += 8) {
      const byteString = binaryText.slice(i, i + 8);
      const charCode = parseInt(byteString, 2);
      if (charCode === 0) break;
      text += String.fromCharCode(charCode);
    }
    return text;
  };

  return (
    <div
      className="container p-5"
      style={{
        backgroundColor: "#35363f",
        height: "800px",
        width: "1000px",
        borderRadius: "20px",
        color: "#fff",
      }}
    >
      <div className="row">
        <div className="col-12 p-3 d-flex justify-content-around">
          <div className="d-flex flex-column align-items-center justify-content-center">
            <div
              className="d-flex align-items-center justify-content-center mb-3"
              style={{ width: "200px", height: "300px", background: "gray" }}
            >
              {img && <img src={img} style={{ width: "100%" }} />}
            </div>
            <Buttonfile text="Load Image" onFileChange={handleImage} />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col d-flex flex-column justify-content-around">
          <textarea
            className="form-control mb-3"
            rows="5"
            readOnly
            value={extractedText}
          ></textarea>
          <div className="d-flex justify-content-center gap-4">
            <button
              className="button"
              style={{ background: "#1dc257" }}
              onClick={extractText}
            >
              Extract Text
            </button>
            <input
              min="1"
              max="3"
              type="number"
              value={lsb}
              onChange={(e) => setLsb(Number(e.target.value))}
              style={{
                width: "100px",
                height: "60px",
                borderRadius: "10px",
                textAlign: "center",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            />
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div
          className="col d-flex justify-content-between"
          style={{ gap: "10px" }}
        >
          <button
            className="button"
            style={{ background: "#1dc257" }}
            onClick={() => navigate(-1)}
          >
            Back
          </button>
          <button
            className="button"
            style={{ background: "#1dc257" }}
            onClick={clearImage}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default Decode;

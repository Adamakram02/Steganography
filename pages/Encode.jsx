import { useState } from "react";
import Buttonfile from "../component/Buttonfile";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";

const Encode = () => {
  const [img, setImage] = useState("");
  const [resultImg, setResultImg] = useState("");
  const [lsb, setLsb] = useState(1);
  const [encMessage, setEncMessage] = useState("");

  const navigate = useNavigate();

  const handleImage = (e) => {
    setImage(e);
    setResultImg("");
  };

  const clearImage = () => {
    setImage("");
    setEncMessage("");
    setResultImg("");
  };

  const encodeText = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const image = new Image();

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);

      const binaryText = toBinaryString(encMessage + "\0");
      const totalPixels = canvas.width * canvas.height;
      const maxTextLength = totalPixels * 3 * lsb;

      if (binaryText.length > maxTextLength) {
        return;
      }

      let textIndex = 0;

      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          if (textIndex >= binaryText.length) break;

          const { data } = ctx.getImageData(x, y, 1, 1);

          for (let channel = 0; channel < 3; channel++) {
            data[channel] = embedBits(
              data[channel],
              binaryText,
              textIndex,
              lsb
            );
            textIndex += lsb;

            if (textIndex >= binaryText.length) break;
          }

          ctx.putImageData(new ImageData(data, 1, 1), x, y);
        }
        if (textIndex >= binaryText.length) break;
      }

      const encodedUrl = canvas.toDataURL("image/bmp");
      setResultImg(encodedUrl);
    };

    if (img) {
      image.src = img;
    }
  };

  const toBinaryString = (text) => {
    let binary = "";
    for (const char of text) {
      binary += char.charCodeAt(0).toString(2).padStart(8, "0");
    }
    return binary;
  };

  const embedBits = (colorComponent, binaryText, textIndex, lsbCount) => {
    const mask = (1 << lsbCount) - 1;
    let newComponent = colorComponent & ~mask;

    for (let i = 0; i < lsbCount && textIndex < binaryText.length; i++) {
      const bitToEmbed = binaryText[textIndex + i];
      newComponent |= parseInt(bitToEmbed) << (lsbCount - i - 1);
    }

    return newComponent;
  };

  const saveImage = () => {
    if (resultImg) {
      const a = document.createElement("a");
      a.href = resultImg;
      a.download = "encoded_image.bmp";
      a.click();
    }
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
      <div>
        <div className="row">
          <div className="col-8 p-3 d-flex justify-content-around">
            <div className="d-flex flex-column align-items-center justify-content-center">
              <div
                className="d-flex align-items-center justify-content-center mb-3"
                style={{ width: "200px", height: "300px", background: "gray" }}
              >
                <img src={img} style={{ width: "100%" }} />
              </div>
              <div>
                <Buttonfile text="Load Image" onFileChange={handleImage} />
              </div>
            </div>
            <div
              className="d-flex flex-column justify-content-center"
              style={{ gap: "5px" }}
            >
              <i
                className="bi bi-arrow-right"
                style={{ fontSize: "100px", color: "#1dc257" }}
              ></i>
            </div>
          </div>
          <div className="col-4 p-3 d-flex flex-column align-items-center justify-content-center">
            <div
              className="d-flex align-items-center justify-content-center mb-3"
              style={{ width: "200px", height: "300px", background: "gray" }}
            >
              <img src={resultImg} style={{ width: "100%" }} />
            </div>
            <div>
              {resultImg && (
                <button
                  className="button"
                  style={{ background: "#1dc257" }}
                  onClick={saveImage}
                >
                  Save Image
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col d-flex flex-column justify-content-around">
            <div className="mb-3">
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="5"
                value={encMessage}
                onChange={(e) => setEncMessage(e.target.value)}
              ></textarea>
            </div>
            <div className="d-flex justify-content-center">
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
          <div className="col">
            <div
              className="d-flex justify-content-between"
              style={{ gap: "10px" }}
            >
              <button
                className="button"
                style={{ background: "#1dc257" }}
                onClick={() => navigate(-1)}
              >
                Back
              </button>
              <div>
                <button
                  className="button"
                  style={{ background: "#1dc257" }}
                  onClick={encodeText}
                >
                  Hide Text
                </button>
              </div>
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
      </div>
    </div>
  );
};

export default Encode;

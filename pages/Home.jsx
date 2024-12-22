import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      className="container p-5 d-flex justify-content-center align-items-center flex-column gap-4"
      style={{
        backgroundColor: "#35363f",
        height: "800px",
        width: "1000px",
        borderRadius: "20px",
        color: "#fff",
      }}
    >
      <div>
        <h3>Name: Adam Akram</h3>
        <h3>Reg Number: 12042379</h3>
        <h3>Steganography</h3>
      </div>
      <div className="d-flex justify-content-center align-items-center gap-3">
        <button
          style={{
            background: "#1dc257",
            width: "150px",
            height: "100px",
            fontSize: "20px",
          }}
          onClick={() => navigate("/encode")}
        >
          Encode
        </button>
        <button
          style={{
            background: "#1dc257",
            width: "150px",
            height: "100px",
            fontSize: "20px",
          }}
          onClick={() => navigate("/decode")}
        >
          Decode
        </button>
      </div>
    </div>
  );
};

export default Home;

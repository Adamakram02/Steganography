import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Encode from "../pages/Encode";
import Decode from "../pages/Decode"; 
import Home from "../pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/encode" element={<Encode />} />
        <Route path="/decode" element={<Decode />} />
      </Routes>
    </Router>
  );
}

export default App;

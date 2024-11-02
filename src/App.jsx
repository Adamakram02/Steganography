import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Encode from "../component/Encode";
import Decode from "../component/Decode";
import Home from "../component/Home";

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

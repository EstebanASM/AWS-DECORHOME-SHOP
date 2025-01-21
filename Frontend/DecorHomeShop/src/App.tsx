import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateProduct from "./pages/products/CreateProduct";
import GetProduct from "./pages/products/GetProduct";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/getproduct" element={<GetProduct />} />
          <Route path="/createproduct" element={<CreateProduct />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

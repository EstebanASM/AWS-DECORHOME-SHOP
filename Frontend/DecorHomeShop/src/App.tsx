import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateProduct from "./pages/products/CreateProduct";
import GetProduct from "./pages/products/GetProduct";
import UpdateProduct from "./pages/products/UpdateProduct";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Logout from "./pages/auth/Logout";

const App: React.FC = () => {
  return (
    <Router>
      <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        <Navbar />
        <div style={{ flex: 1, padding: "2rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/getproduct" element={<GetProduct />} />
            <Route path="/createproduct" element={<CreateProduct />} />
            <Route path="/updateproduct/:id" element={<UpdateProduct />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;


import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from '../components/Dashboard';
import Login from '../components/Auth/Login';

const ProjectRoutes = (props) => (
    <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} /> */}
    </Routes>
);
export default ProjectRoutes;
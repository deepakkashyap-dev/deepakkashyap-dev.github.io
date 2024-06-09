import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from '../components/Dashboard';
// import Login from '../components/Auth/Login';
import Cart from '../components/Cart';
import Products from '../components/Product';

const ProjectRoutes = () => (
    <Routes>
        <Route exact path="/" element={<Dashboard />}/>
        <Route exact path="/cart" element={<Cart />}/>
        <Route path="/products" element={<Products />} />
        {/* <Route path="/login" element={<Login />} /> */}
        {/*  <Route path="/products/:productId" element={<ProductDetails />} />  */}
    </Routes>
);
export default ProjectRoutes;
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homen from "../pages/Homen";
import ProductCategoryPage from "../pages/ProductCategoryPage";
import ServiceCategoryPage from "../pages/ServiceCategoryPage";
import Menu from "../components/Menu";
import Auth from "../pages/Login";
import AboutUs from "../pages/AboutUs";
import { RegisterLogin } from "../pages/Register";
import PrivateRoute from "./PrivateRoute";
import AdminPanel from "../pages/AdminPanel";

export default function AppRouter() {
  return (
    <>
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/" element={<Homen />} />

          <Route
            path="/producto/:slug"
            element={<ProductCategoryPage />}
          />
          <Route
            path="/servicio/:slug"
            element={<ServiceCategoryPage />}
          />

          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<RegisterLogin />} />
          <Route
            path="/admin/*"
            element={
              <PrivateRoute>
                <AdminPanel />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

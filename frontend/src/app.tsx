import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfigProvider, App as AntApp } from "antd";
import AuthLayout from "./layouts/auth-layout";
import MainLayout from "./layouts/main-layout";
import AdminLayout from "./layouts/admin-layout";
import Overview from "./pages/admin/overview";
import UserList from "./pages/admin/user-list";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import NotFound from "./pages/not-found";
import Home from "./pages/home";
import Category from "./pages/category";
import Cart from "./pages/cart";
import Search from "./pages/search";
import Profile from "./pages/profile";
import Checkout from "./pages/checkout";
import ProductDetail from "./pages/product-detail";

const App: React.FC = () => {
  return (
    <AntApp>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#bb4d00",
            borderRadius: 0,
            fontFamily: "Arial",
          },
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>

            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/search" element={<Search />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route
                path="/products/:productSlug"
                element={<ProductDetail />}
              />
              <Route path="/categories/:categorySlug" element={<Category />} />
            </Route>

            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Overview />} />
              <Route path="user-list" element={<UserList />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </AntApp>
  );
};

export default App;

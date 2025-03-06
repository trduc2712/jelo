import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import { NotificationProvider } from "./contexts/notification-context";
import { AuthProvider } from "./contexts/auth-context";
import AuthLayout from "./layouts/auth-layout";
import MainLayout from "./layouts/main-layout";
import AdminLayout from "./layouts/admin-layout";
import Overview from "./pages/admin/overview";
import UserList from "./pages/admin/user-list";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Home from "./pages/home";
import Category from "./pages/category";
import Search from "./pages/search";
import Checkout from "./pages/checkout";
import ProductDetail from "./pages/product-detail";
import RoleBasedRoute from "./components/role-based-route";
import Error from "./pages/error";

const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#bb4d00",
          borderRadius: 0,
          fontFamily: "Arial",
        },
      }}
    >
      <AuthProvider>
        <NotificationProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/auth" element={<AuthLayout />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
              </Route>

              <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route
                  path="/products/:productSlug"
                  element={<ProductDetail />}
                />
                <Route
                  path="/categories/:categorySlug"
                  element={<Category />}
                />
              </Route>

              <Route
                path="/admin"
                element={
                  <RoleBasedRoute
                    allowedRoles={["ADMIN", "MODERATOR"]}
                    redirectPath="/unauthorized"
                  >
                    <AdminLayout />
                  </RoleBasedRoute>
                }
              >
                <Route index element={<Overview />} />
                <Route path="user-list" element={<UserList />} />
              </Route>

              <Route
                path="/unauthorized"
                element={
                  <Error
                    statusCode={401}
                    message="You do not have permission to access this page."
                  />
                }
              />
              <Route
                path="*"
                element={
                  <Error statusCode={404} message="Page can not be found." />
                }
              />
            </Routes>
          </BrowserRouter>
        </NotificationProvider>
      </AuthProvider>
    </ConfigProvider>
  );
};

export default App;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import { NotificationProvider } from "./contexts/notification-context";
import { AuthProvider } from "./contexts/auth-context";
import { AdminLayout, AuthLayout, MainLayout } from "./layouts";
import {
  CreateUser,
  UserList,
  Overview,
  Login,
  Register,
  Category,
  Checkout,
  Error,
  Home,
  ProductDetail,
  Search,
} from "./pages";
import { RoleBasedRoute } from "./components";

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
                <Route path="users" element={<UserList />} />
                <Route path="users/new" element={<CreateUser />} />
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
                path="/banned"
                element={
                  <Error statusCode={403} message="You have been banned." />
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

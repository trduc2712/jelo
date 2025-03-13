import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AdminLayout, AuthLayout, MainLayout } from './layouts';
import {
  CategoryList,
  CreateCategory,
  EditCategory,
  Dashboard,
  OrderList,
  ProductList,
  UserList,
  Login,
  Register,
  Category,
  Checkout,
  Error,
  Home,
  ProductDetail,
  Search,
} from './pages';
import { RoleBasedRoute, Provider } from './components';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider>
        <Routes>
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/products/:productSlug" element={<ProductDetail />} />
            <Route path="/categories/:categorySlug" element={<Category />} />
          </Route>

          <Route
            path="/admin"
            element={
              <RoleBasedRoute
                allowedRoles={['SUPER_ADMIN', 'ADMIN', 'MODERATOR']}
                redirectPath="/unauthorized"
              >
                <AdminLayout />
              </RoleBasedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="users" element={<UserList />} />
            <Route path="orders" element={<OrderList />} />
            <Route path="products" element={<ProductList />} />
            <Route path="categories" element={<CategoryList />} />
            <Route
              path="categories/edit/:categoryId"
              element={<EditCategory />}
            />
            <Route path="categories/new" element={<CreateCategory />} />
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
            element={<Error statusCode={403} message="You have been banned." />}
          />
          <Route
            path="*"
            element={<Error statusCode={404} message="Page cannot be found." />}
          />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
};

export default App;

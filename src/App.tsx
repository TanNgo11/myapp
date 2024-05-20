import './App.css';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import DashboardLayout from './GUI/admin/layout/DashboardLayout';
import AddNewProduct from './GUI/admin/page/AddNewProduct';
import ProductManagement from './GUI/admin/page/ProductManagement';
import MainLayout from './GUI/user/layout/MainLayout';
import Cart from './GUI/user/page/Cart';
import Checkout from './GUI/user/page/Checkout';
import HomePage from './GUI/user/page/HomePage';
import LoginPage from './GUI/user/page/LoginPage';
import MainCategory from './GUI/user/page/MainCategory';
import NotFoundPage from './GUI/user/page/NotFoundPage';
import ProductDetail from './GUI/user/page/ProductDetail';
import RoleBasedRoute from './hooks/RoleBasedRoute';
import { Role } from './models/Role';
import { error } from 'console';





const appRoutes = [
  {
    element: <MainLayout />,
    path: '/',
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'home', element: <HomePage /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'detail/:slug', element: <ProductDetail /> },
      { path: 'cart', element: <Cart /> },
      { path: 'category/:categoryName', element: <MainCategory /> },
      // { path: '*', element: <NotFoundPage /> }
    ]
  },
  { path: 'login', element: <LoginPage /> },
  {
    path: 'admin',
    element: (
      <RoleBasedRoute requiredRole={Role.ADMIN}>
        <DashboardLayout />
      </RoleBasedRoute>
    ),
    children: [
      { path: 'products', element: <ProductManagement /> },
      { path: 'products/add', element: <AddNewProduct /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];

const router = createBrowserRouter(appRoutes);

function App() {

  return (

    <RouterProvider router={router} />

  )
}

export default App;

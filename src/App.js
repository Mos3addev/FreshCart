import {  RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import MainLayout from './Layout/MainLayout';
import HomePage from './Pages/HomePage';
import Products from './Component/Products/Products';
import ProductDetails from './Component/ProductDetails/ProductDetails';
import Register from './Component/Register/Register';
import Login from './Component/Login/Login';
import Category from './Component/Category/Category';
import Brand from './Component/Brand/Brand';
import ErrorPage from './Component/ErrorPage/ErrorPage';
import CategoryProductPage from './Pages/CategoryProductPage';
import BrandProductPage from './Pages/BrandProductPage';
import Wishlist from './Component/Wishlist/Wishlist';
import Cart from './Component/Cart/Cart';
import Profile from './Component/Profile/Profile';
import Setting from './Component/Profile/Setting';
import Order from './Component/Profile/Order';
import Address from './Component/Profile/Address';
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute';

function App() {
  let route = createBrowserRouter([
    {
      path:'',
      element:<MainLayout/>,
      children:[
        {index:true , element:<HomePage/> },
        {path:'/product' , element:<Products/> },
        {path:'/product-details/:id' , element:<ProductDetails/> },
        {path:'/category' , element:<Category/> },
        {path:'/CategoryProduct/:CategoryId' , element:<CategoryProductPage/> },
        {path:'/brand' , element:<Brand/> },
        {path:'/BrandProduct/:BrandId' , element:<BrandProductPage/> },
        {path:'/cart' , element: <ProtectedRoute><Cart/></ProtectedRoute>},
        {path:'/wishlist' , element:<ProtectedRoute> <Wishlist/> </ProtectedRoute> },
        {path:'/profile' , element:<ProtectedRoute><Profile/></ProtectedRoute>,
          children:[
          {index:true , element:<ProtectedRoute><Setting/></ProtectedRoute>},
          {path:'order' , element:<ProtectedRoute><Order/></ProtectedRoute> },
          {path:'address' , element:<ProtectedRoute><Address/></ProtectedRoute> },
        ]},
        {path:'/register' , element:<Register/> },
        {path:'/login' , element:<Login/> },
        {path:'*' , element:<ErrorPage/> },
      ]
    }
  ])
  return <>
    <ToastContainer theme='colored'/>
   <RouterProvider router={route}/>
   </>
}

export default App;

import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Pages/LoginPage.jsx';
import Register from '../Pages/RegisterPage.jsx';
import Checkout1 from '../Pages/CheckoutPage.jsx';
import Checkout2 from '../Pages/CheckoutPage2.jsx'
import NotFound from '../Pages/NotFound.jsx';
import Home from '../Pages/Home.jsx'
import Layout from './layout.jsx'
import ProtectedRoute from '@/components/ProtectedRoute.jsx';
import About from '../Pages/About.jsx';
import FoodMenu from '../Pages/FoodMenu.jsx';
import TermsConditions from '../Pages/TermsConditions.jsx';
import PrivacyPolicy from '../Pages/PrivacyPolicy.jsx';
import Services from '../Pages/Services.jsx';
import Cart from '../Pages/Cart.jsx';
import FoodDescription from '../Pages/FoodDescription.jsx'


const AppRoutes = () => {
  return (
    <Layout>
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/register' element={<Register />} />
        <Route path='/chackout-1' element={<Checkout1 />} />
        <Route path='/chackout-2' element={<Checkout2 />} />
        <Route path='/about' element={<ProtectedRoute><About /></ProtectedRoute>} />
        <Route path='/food-menu' element={<FoodMenu />} />
        <Route path='/terms-conditions' element={<ProtectedRoute><TermsConditions /></ProtectedRoute>} />
        <Route path='/privacy-policy' element={<ProtectedRoute><PrivacyPolicy /></ProtectedRoute>} />
        <Route path='/services' element={<ProtectedRoute><Services /></ProtectedRoute>} />
        <Route path='/cart' element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path='/food-description' element={<ProtectedRoute><FoodDescription/></ProtectedRoute>}/>
      </Routes>
    </Layout>
  )
}

export default AppRoutes
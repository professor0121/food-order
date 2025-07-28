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
      </Routes>
    </Layout>
  )
}

export default AppRoutes
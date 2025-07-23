import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../Pages/Dashboard';
import Login from '../Pages/LoginPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
    </Routes>
  )
}

export default AppRoutes
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../Pages/Dashboard';
import Orders from '../Pages/Orders';
import Login from '../Pages/LoginPage';
import ProtectedRoute from '../components/ProtectedRoute';
import AllUsers from '../Pages/AllUsers';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route
        path='/dashboard'
        element={
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
        }
      />
      <Route
        path='/orders'
        element={
          <ProtectedRoute>
            <Orders/>
          </ProtectedRoute>
        }
      />

      <Route
        path='/users'
        element={
          <ProtectedRoute>
            <AllUsers/>
          </ProtectedRoute>
        }
      />

      
    </Routes>
  )
}

export default AppRoutes
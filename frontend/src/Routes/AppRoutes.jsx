import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Pages/LoginPage.jsx';
import Layout from './layout.jsx'

const AppRoutes = () => {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Login />} />
      </Routes>
    </Layout>
  )
}

export default AppRoutes
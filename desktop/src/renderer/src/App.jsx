import React from 'react'
import PropTypes from 'prop-types'
import Header from './components/Header'
import Layout from './Layout'
import Home from './Pages/Home'
import {  Routes,Route } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import Orders from './Pages/Orders'
import Activity from './Pages/Activity'
import Users from './Pages/Users'
import Tiffin from './Pages/Tiffin'
import Meal from './Pages/Meal'
import Staff from './Pages/Staff'
import Settings from './Pages/Settings'

const App = props => {
  return (
    <Layout>
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/dashboard" element={<Dashboard/>} />
         <Route path="/orders" element={<Orders/>} />
         <Route path="/activity" element={<Activity/>} />
         <Route path="/users" element={<Users/>} />
         <Route path="/tiffin" element={<Tiffin/>} />
         <Route path="/meals" element={<Meal/>} />
         <Route path="/staff" element={<Staff/>} />
         <Route path="/settings" element={<Settings/>} />

      </Routes>
    </Layout>
  )
}

App.propTypes = {}

export default App
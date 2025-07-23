import React, { useEffect } from 'react'
import AppRoutes from './routes/AppRoutes'
import { BrowserRouter } from 'react-router-dom'
import { useAppDispatch } from './Redux/hooks'
import { checkAuthStatus } from './Redux/slices/authSlice'

const App = () => {
  const dispatch = useAppDispatch()

  // Check authentication status on app initialization
  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      dispatch(checkAuthStatus())
    }
  }, [dispatch])

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
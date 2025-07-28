import React, { useEffect } from 'react'
import AppRoutes from './routes/AppRoutes'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'
import { useDispatch, useSelector } from 'react-redux'
import { loadUserFromToken } from './Redux/slices/authSlice'


const App = () => {
    const dispatch = useDispatch()
  const { isAuthenticated } = useSelector(state => state.auth)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token && !isAuthenticated) {
      dispatch(loadUserFromToken())
    }
  }, [dispatch, isAuthenticated])
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AppRoutes />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
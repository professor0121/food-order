import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadUserFromToken } from '@/Redux/slices/authSlice'
import { useNavigate } from 'react-router-dom'

const AuthLoader = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token, isAuthenticated, loading } = useSelector((state) => state.auth)

  useEffect(() => {
    if (token && !isAuthenticated && !loading) {
      dispatch(loadUserFromToken())
    } else if (!token && !isAuthenticated && !loading) {
      navigate('/home')
    }
  }, [token, isAuthenticated, loading, dispatch, navigate])

  return null
}

export default AuthLoader

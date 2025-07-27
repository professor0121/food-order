import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/Redux/hooks'
import { checkAuthStatus } from '@/Redux/slices/authSlice'
import { Skeleton } from '@/components/ui/skeleton'

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { isAuthenticated, loading, token } = useAppSelector((state) => state.auth)

  useEffect(() => {
    // If there's a token but not authenticated, verify it
    if (token && !isAuthenticated && !loading) {
      dispatch(checkAuthStatus())
    }
    // If no token and not authenticated, redirect to login
    else if (!token && !isAuthenticated && !loading) {
      navigate('/')
    }
  }, [token, isAuthenticated, loading, dispatch, navigate])

  // Show loading skeleton while checking authentication
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    )
  }

  // If not authenticated and not loading, don't render children
  if (!isAuthenticated && !loading) {
    return null
  }

  // If authenticated, render the protected content
  return children
}

export default ProtectedRoute

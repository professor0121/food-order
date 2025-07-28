import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadUserFromToken } from '@/Redux/slices/authSlice'
import { Skeleton } from '@/components/ui/skeleton'

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch()
  const { isAuthenticated, loading, token } = useSelector((state) => state.auth)

  useEffect(() => {
    if (token && !isAuthenticated && !loading) {
      dispatch(loadUserFromToken())
    }
  }, [token, isAuthenticated, loading, dispatch])

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

  if (!isAuthenticated && !loading) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute

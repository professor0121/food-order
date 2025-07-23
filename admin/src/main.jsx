import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ReduxProvider } from './Redux/Provider'
import { Toaster } from './components/ui/sonner'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReduxProvider>
      <App />
      <Toaster />
    </ReduxProvider>
  </StrictMode>,
)

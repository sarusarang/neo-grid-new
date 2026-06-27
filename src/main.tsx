import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from './context/AuthContext.tsx'
import { CartProvider } from './context/CartContext.tsx'



const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})


createRoot(document.getElementById('root')!).render(


  <BrowserRouter>

    <QueryClientProvider client={queryClient}>

      <AuthProvider>

        <CartProvider>

          <GoogleOAuthProvider clientId="960109017160-cq8bfuipogu6ubk3mc5pjkhaql0jiuu5.apps.googleusercontent.com">

            <App />

          </GoogleOAuthProvider>

        </CartProvider>

      </AuthProvider>

    </QueryClientProvider>

  </BrowserRouter>



)

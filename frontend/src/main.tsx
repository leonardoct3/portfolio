import { createRoot } from 'react-dom/client'
import './styles/tailwind.css'
import { Toaster } from 'react-hot-toast'
import { RouterProvider } from 'react-router-dom'
import { router } from './router.tsx'

createRoot(document.getElementById('root')!).render(
    <>
      <RouterProvider router={router} />
      <Toaster 
        position='bottom-right'
      />
    </>
    
)

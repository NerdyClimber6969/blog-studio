import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import routes from './routes.jsx'
import './style/main.css'

const router = createBrowserRouter(routes);

createRoot(document.querySelector('body')).render(
  <StrictMode>
      <RouterProvider router={router}/>
  </StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import { FreshCoffeProvider } from './context/FreshCoffeProvider';
import './index.css';
import router from './router';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FreshCoffeProvider>
      <RouterProvider router={router} />
    </FreshCoffeProvider>
  </React.StrictMode>
)

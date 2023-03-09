import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import LoginPage from './routes/Login';
import FormPage from './routes/Form';
import RDVPage from './routes/Rdv';

const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage/>,
    },
    {
      path: "/form",
      element: <FormPage />,
    },
    {
      path: "/rdv",
      element: <RDVPage />,
    },
  ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
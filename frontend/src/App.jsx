import React from 'react';
import Dashboard from './Pages/Dashboard';
import Reg_Log from './Pages/Reg_Log';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './Pages/MainLayout';
import { socket } from './socket';


function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element:<Reg_Log/>,
    },
    {
      path:"/Dashboard",
      element:<MainLayout/>,
      children: [
        {
          path: "",
          element:<Dashboard/>
        },
        
        // {
        //   path: "/monitor",
        //   children:[
        //     {

        //       path:"/monitor/:Slugs",
        //       element:<Monitoring/>
        //     }
        //   ]
        // },
        // {
        //   path: "/about",
        //   element: <About/>,
        // },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App

import './App.css'


import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import mainLayout from './layouts/mainLayout';

const router = createBrowserRouter([
  {
    path: "/",
    Component: mainLayout,
    children: [
      {
        index: true,
        element: <Home></Home>
      },
      {
        path: "/about-us",
        element: <AboutUs></AboutUs>
      }

    ]

  },

]);

function Router() {


  return (
    <>
      <div>
        <RouterProvider router={router} />

      </div>
    </>
  )
}

export default Router

import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Message from "./pages/Message/Message";
import Profile from "./pages/Profile/profile";
import Login from "./pages/Registeration/Login/Login";
import Register from "./pages/Registeration/Register/Register";

import Sidebar from "./components/Sidebar/Sidebar";
import "./App.scss";
function App() {
  const Layout = () => {
    return (
      <div>
        <Sidebar />
        <div>
          <Outlet />
        </div>
      </div>
    );
  };

  // const ProtectedRoute = ({ children }) => {
  //   if (!currentUser) {
  //     return <Navigate to="/login" />;
  //   }

  //   return children;
  // };

  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/message",
          element: <Message />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/Home/Home";
import Message from "./pages/Message/Message";
import Profile from "./pages/Profile/profile";
import Login from "./pages/Registeration/Login/Login";
import Register from "./pages/Registeration/Register/Register";
import { useSelector } from "react-redux";
// import Sidebar from "./components/Sidebar/Sidebar";
import { Navigate } from "react-router-dom";
import Header from "./components/Header/header";
import "./App.scss";
function App() {
  const Layout = () => {
    return (
      <div>
        <Header/>
        <div>
          <Outlet />
        </div>
      </div>
    );
  };

  const { user } = useSelector((state) => state.user);

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
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

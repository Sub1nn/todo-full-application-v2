import Login from "../pages/Login";
import NewComponent from "../pages/Practice";
import Register from "../pages/Register";

export const guestRoutes = [
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/practice",
    element: <NewComponent />,
  },
];

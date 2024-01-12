import AddTodo from "../pages/AddTodo";
import Home from "../pages/Home";

export const mainRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/add-todo",
    element: <AddTodo />,
  },
];

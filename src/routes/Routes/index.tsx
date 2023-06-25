import { Suspense, lazy } from "react";
import MainLayout from "@/layouts/MainLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "@/layouts/AuthLayout";
import PublicLayout from "@/layouts/PublicLayout";
import { ErrorBoundary } from "react-error-boundary";
import ProtectedRoute from "../ProtectedRoute";
import AuthRoute from "../AuthRoute";

const Loadable = (Component: any) => (props: JSX.IntrinsicAttributes) =>
  (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Suspense fallback={<>Loading 2...</>}>
        <Component {...props} />
      </Suspense>
    </ErrorBoundary>
  );

const Dashboard = Loadable(lazy(() => import("@/pages/Dashboard")));
const Login = Loadable(lazy(() => import("@/pages/Login")));
const Home = Loadable(lazy(() => import("@/pages/Home")));
const Users = Loadable(lazy(() => import("@/pages/Users")));
const UsersList = Loadable(
  lazy(() => import("@/pages/Users/UsersList"))
);
const UsersAdd = Loadable(
  lazy(() => import("@/pages/Users/UsersAdd"))
);
const UsersEdit = Loadable(
  lazy(() => import("@/pages/Users/UsersEdit"))
);
const UsersDetail = Loadable(
  lazy(() => import("@/pages/Users/UsersDetail"))
);

const mainRoutes = [
  {
    path: "/dashboard",
    element: <Dashboard />,
    handle: {
      crumb: "Dashboard",
    },
  },
  {
    path: "/users",
    element: <Users />,
    handle: {
      crumb: "Users",
    },
    children: [
      {
        index: true,
        element: <UsersList />,
      },
      {
        path: "add",
        element: <UsersAdd />,
        handle: {
          crumb: "Add Users",
        },
      },
      {
        path: ":id",
        element: <UsersDetail />,
        handle: {
          crumb: "Detail Users",
        },
      },
      {
        path: ":id/edit",
        element: <UsersEdit />,
        handle: {
          crumb: "Edit Users",
        },
      },
    ],
  },
];

const authRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
];

const publicRoutes = [
  {
    path: "/",
    element: <Home />,
    handle: {
      crumb: "Home",
    },
  },
];

export const Routes = () => {
  const routes = [
    {
      element: <MainLayout />,
      children: [
        {
          element: <ProtectedRoute />,
          children: mainRoutes,
        },
      ],
    },
    {
      element: <AuthLayout />,
      children: [
        {
          element: <AuthRoute />,
          children: authRoutes,
        },
      ],
    },
    {
      element: <PublicLayout />,
      children: publicRoutes,
    },
    {
      path: "*",
      element: <>not found</>,
    },
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

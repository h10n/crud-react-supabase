import { useBoundStore } from "@/store/useBoundStore";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = () => {
  const user = useBoundStore((state) => state.user);
  return !user ? <Outlet /> : <Navigate to="/dashboard" />;
};

export default AuthRoute;

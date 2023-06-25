import { useBoundStore } from "@/store/useBoundStore";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const user = useBoundStore((state) => state.user);
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;

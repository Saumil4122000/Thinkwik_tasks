import { useAuth } from "./AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export const AuthRoute = () => {
  const { isLoading, isAuthenticated } = useAuth();

  const token = sessionStorage.getItem("isLoggedIn");

  if (!isAuthenticated && !isLoading && !token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

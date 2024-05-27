import { Navigate, Outlet } from "react-router-dom";
import useAuthProvider from "../store/AuthProvider";

function ProtectedRoute() {
  const { isAuth } = useAuthProvider();

  return isAuth ? <Outlet/> : <Navigate to="/"/>
}

export default ProtectedRoute
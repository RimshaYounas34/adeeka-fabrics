
import { Navigate, useLocation } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const location = useLocation();

  const token =
    localStorage.getItem("adeeka_admin_token");

  const admin =
    localStorage.getItem("adeeka_admin");

  // =====================================================
  // ADMIN LOGIN NAHI HAI
  // =====================================================

  if (!token || !admin) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // =====================================================
  // ADMIN LOGIN HAI
  // =====================================================

  return children;
};

export default ProtectedAdminRoute;

import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem("signupEmail");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
    }
    
    return children
}

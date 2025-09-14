import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem("signupEmail");

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

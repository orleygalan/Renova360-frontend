import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Mientras carga el usuario
  if (loading) return <div>Loading...</div>;

  // Si NO hay usuario → redirigir a Login
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Si está autenticado → mostrar el contenido
  return children;
}

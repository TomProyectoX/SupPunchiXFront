import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const AdminRoute = ({ children }) => {
  const { token, role } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
};
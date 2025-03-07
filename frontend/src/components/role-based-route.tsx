import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";
import Loading from "../pages/loading";

interface RoleBasedRouteProps {
  allowedRoles: string[];
  redirectPath: string;
  children: ReactNode;
}

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({
  allowedRoles,
  redirectPath,
  children,
}) => {
  const { user } = useAuth();

  if (user === null) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default RoleBasedRoute;

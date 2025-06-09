import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const IsAdminProtectedRoute = ({ children }) => {

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("authUser"));

  if(token && user.role == "admin")
    return children;
  else {
    return <Navigate to="/403" replace />
  }
};

IsAdminProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default IsAdminProtectedRoute;

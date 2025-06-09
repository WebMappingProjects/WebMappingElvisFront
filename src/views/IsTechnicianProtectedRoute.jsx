import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const IsTechnicianProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("authUser"));

  if(token && (user.role == "admin" || user.role == "technicien"))
    return children;
  else {
    return <Navigate to="/403" replace />
  }
};

IsTechnicianProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default IsTechnicianProtectedRoute;

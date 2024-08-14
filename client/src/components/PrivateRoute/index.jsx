import { checkToken, getRole } from '../../utils/localfunctions';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = props => {
  return checkToken() && props.role == getRole() ? (
    <Outlet />
  ) : (
    <Navigate to="/doctor/login" />
  );
};
export default PrivateRoute;

import axios from '../../utils/axios';
import { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import './usersidebar.css';

const UserSidebar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const getUserDetails = async () => {
    const userID = localStorage.getItem('ID');

    // console.log(userID);
    const response = await axios.get(`user/userbyid/${userID}`);
    setUser(response.data);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const logout = () => {
    localStorage.removeItem('ID');
    navigate('/user/login');
  };

  return (
    <div className="sidebar">
      <div className="details">
        <div className="content">
          <img className="userim" src="/useric3.png" />
          <p>{` ${user.firstName} ${user.lastName}`}</p>

          <p>{user.email}</p>
        </div>
      </div>
      <div className="contents">
        <p>
          <NavLink className="link" to="/user/home">
            Home
          </NavLink>
        </p>
        <p>
          <NavLink className="link" to="/department">
            Departments
          </NavLink>
        </p>

        <p>
          <NavLink className="link" to="/doctor">
            Doctors
          </NavLink>
        </p>
        <p>
          <NavLink className="link" to="/user/bookings">
            Appointments
          </NavLink>
        </p>

        <p onClick={logout}>Logout</p>
      </div>
    </div>
  );
};
export default UserSidebar;

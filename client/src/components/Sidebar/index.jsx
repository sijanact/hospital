import axios from '../../utils/axios';
import { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import './sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState({});

  const getDoctorDetails = async () => {
    const doctorID = localStorage.getItem('ID');

    const response = await axios.get(`doctor/${doctorID}`);
    setDoctor(response.data);
  };

  useEffect(() => {
    getDoctorDetails();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('ID');
    navigate('/doctor/login');
  };

  return (
    <div className="sidebar">
      <div className="details">
        <div className="content">
          <p>{`${doctor.firstName} ${doctor.lastName}`}</p>
          <p>{doctor.email}</p>
        </div>
        <img src={doctor.image} alt="" />
      </div>
      <div className="contents">
        <p>
          <NavLink className="link" to="/doctor/home">
            Home
          </NavLink>
        </p>
        <p>
          <NavLink className="link" to="/doctor/bookings">
            Booking
          </NavLink>
        </p>

        <p>Add slot</p>
        <p onClick={logout}>Logout</p>
      </div>
    </div>
  );
};
export default Sidebar;

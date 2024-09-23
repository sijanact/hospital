import axios from '../../utils/axios';
import { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import './sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState({});

  const getDoctorDetails = async () => {
    const doctorID = localStorage.getItem('ID');
    // console.log(doctorID);
    // console.log('hello');
    const response = await axios.get(`doctor/${doctorID}`);
    // console.log(response.data);
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
        <div className="image">
          <img className="detimage" src={doctor.image} alt="" />
        </div>
        <div className="content">
          <p>{`${'Dr.'} ${doctor.firstName} ${doctor.lastName}`}</p>
          <p>{doctor.qualification}</p>

          <p>{doctor.email}</p>
        </div>
      </div>
      <div className="contents">
        <p>
          <NavLink className="link" to="/doctor/home">
            Home
          </NavLink>
        </p>
        <p>
          <NavLink className="link" to="/doctor/bookings">
            Appointments
          </NavLink>
        </p>

        <p>
          <NavLink className="link" to="/doctor/slot">
            Add slots
          </NavLink>
        </p>

        <p>
          <NavLink className="link" to="/doctor/myslot">
            My slots
          </NavLink>
        </p>
        <p onClick={logout}>Logout</p>
      </div>
    </div>
  );
};
export default Sidebar;

import './userbooking.css';
import UserSidebar from '../../components/UserSidebar';
import { useState, useEffect } from 'react';
import axios from '../../utils/axios';

const UserBooking = () => {
  const [appointment, setAppointment] = useState([]);

  const fetchAppointments = async () => {
    try {
      const userID = localStorage.getItem('ID');
      console.log(userID);
      const response = await axios.get(`/appointment/user/${userID}`);

      setAppointment(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <>
      <div className="user-home">
        <UserSidebar />
        <div className="contentstable">
          <div className="contenttab">
            {appointment.length > 0 ? (
              <table className="appointments-table">
                <thead>
                  <tr>
                    <th>Appointment ID</th>
                    <th>Doctor Name</th>
                    <th>Date</th>
                    <th>From</th>
                    <th>To</th>
                  </tr>
                </thead>
                <tbody>
                  {appointment.map(item => (
                    <tr key={item.id}>
                      <td>{item._id}</td>
                      <td>{`${item.doctorId.firstName} ${item.doctorId.lastName}`}</td>
                      <td>{item.slot.date}</td>
                      <td>{item.slot.from}</td>
                      <td>{item.slot.to}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No appointments found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBooking;

import './docbooking.css';
import Sidebar from '../../components/Sidebar';
import { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import { checkToken } from '../../utils/localfunctions';

const DocBooking = () => {
  const [appointment, setAppointment] = useState([]);

  const fetchAppointments = async () => {
    try {
      const doctorID = localStorage.getItem('ID');
      console.log(doctorID);
      const response = await axios.get(`/appointment/doctor/${doctorID}`);

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
      <div className="doc-home">
        <Sidebar />
        <div className="contentstable">
          <div className="contenttab">
            {appointment.length > 0 ? (
              <table className="appointments-table">
                <thead>
                  <tr>
                    <th>Appointment ID</th>
                    <th>Patient Name</th>
                    <th>Date</th>
                    <th>From</th>
                    <th>To</th>
                  </tr>
                </thead>
                <tbody>
                  {appointment.map(item => (
                    <tr key={item.id}>
                      <td>{item._id}</td>
                      <td>{`${item.userId.firstName} ${item.userId.lastName}`}</td>{' '}
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

export default DocBooking;

import './doctor.css';
import axios from '../../utils/axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import UserSidebar from '../../components/UserSidebar';

const Doctor = () => {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState([]);
  const getDoctorDetails = async () => {
    const response = await axios.get('/doctor');
    setDoctor(response.data);
    console.log(response);
  };
  const getDoctor = doctorId => {
    navigate(`/docprofile/${doctorId}`);
  };

  useEffect(() => {
    getDoctorDetails();
  }, []);

  return (
    <>
      <div className="doctormain">
        <UserSidebar />
        <div className="carddetails">
          {doctor.map((item, index) => {
            return (
              <div className="card">
                <div className="doctorcard">
                  <img
                    onClick={() => {
                      getDoctor(item._id);
                    }}
                    className="dimage"
                    src={item.image}
                    alt=""
                  />
                  <p>
                    <p>{`${'Dr.'} ${item.firstName} ${item.lastName}`}</p>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Doctor;

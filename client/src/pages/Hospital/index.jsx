import './hospital.css';
import axios from '../../utils/axios';
import { useState, useEffect } from 'react';
import UserSidebar from '../../components/UserSidebar';

const Hospital = () => {
  const [hospital, setHospital] = useState([]);
  const getHospitalDetails = async () => {
    const response = await axios.get('/hospital');
    setHospital(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    getHospitalDetails();
  }, []);

  return (
    <>
      <div className="hospitalmain">
        <UserSidebar />
        <div className="carddetails">
          {hospital.map((item, index) => {
            return (
              <div className="card">
                <div className="hospcard">
                  <img className="dimage" src={item.image} alt="" />
                  <p>{item.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Hospital;

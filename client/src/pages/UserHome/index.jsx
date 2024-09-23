import './userhome.css';
import axios from '../../utils/axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserSidebar from '../../components/UserSidebar';

const UserHom = () => {
  const navigate = useNavigate();
  const [hospital, setHospital] = useState([]);

  const getHospitalDetails = async () => {
    const response = await axios.get(`/hospital`);
    setHospital(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    getHospitalDetails();
  }, []);

  const getDepartmentByHospitalId = hospitalId => {
    navigate(`/departmentbyhospitalid/${hospitalId}`);
    console.log(hospitalId);
  };

  return (
    <>
      <div className="hom">
        <UserSidebar />
        <div className="hos">
          <div className="hosdetails">
            {hospital.map((item, index) => {
              return (
                <div className="hoscard">
                  <div className="det">
                    <img
                      className="detailimage"
                      onClick={() => getDepartmentByHospitalId(item._id)}
                      src={item.image}
                      alt=""
                    />
                    <p>{item.name}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserHom;

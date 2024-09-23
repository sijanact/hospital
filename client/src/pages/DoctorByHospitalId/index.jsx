import './doctorbyhospital.css';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';
import { useState, useEffect } from 'react';
import UserSidebar from '../../components/UserSidebar';

const DoctorByHospitalId = () => {
  const navigate = useNavigate();
  const { id, departmentid } = useParams();
  const [doctor, setDoctor] = useState([]);

  const getDoctorDetails = async () => {
    try {
      const response = await axios.get(
        `/doctor/hospital/${id}/department/${departmentid}`
      );
      // console.log(id);
      // console.log(departmentid);
      setDoctor(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getDoctorById = doctorId => {
    navigate(`/docprofile/${doctorId}`);
  };

  useEffect(() => {
    getDoctorDetails();
  }, []);

  return (
    <div className="docthos">
      <UserSidebar />
      <div className="doctors">
        {doctor.map((item, index) => {
          return (
            <div className="doct">
              <div className="detailsdoc">
                <img
                  className="docimge"
                  onClick={() => getDoctorById(item._id)}
                  src={item.image}
                  alt=""
                />
                <p>
                  Dr. {item.firstName} {item.lastName}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DoctorByHospitalId;

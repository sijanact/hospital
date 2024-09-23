import './doctorbydepartment.css';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';
import { useState, useEffect } from 'react';
import UserSidebar from '../../components/UserSidebar';

const DoctorByDepartmentId = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [doctor, setDoctor] = useState([]);

  const getDoctorDetails = async () => {
    try {
      console.log(id);
      const response = await axios.get(`/doctor/${id}/doctor`);

      setDoctor(response.data);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getDoctorByDepartmentId = doctorId => {
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
                  onClick={() => getDoctorByDepartmentId(item._id)}
                  src={item.image}
                  alt=""
                />
                <p>{`${'Dr.'} ${item.firstName} ${item.lastName}`}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DoctorByDepartmentId;

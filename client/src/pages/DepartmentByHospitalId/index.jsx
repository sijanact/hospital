import './departmentbyid.css';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';
import { useState, useEffect } from 'react';
import UserSidebar from '../../components/UserSidebar';

const DepartmentByHospitalId = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [department, setDepartment] = useState([]);
  const getDepartmentDetails = async () => {
    const response = await axios.get(`/hospital/${id}/department`);
    setDepartment(response.data);
    console.log(response.data);
  };

  const getDoctorByHospitalId = departmentId => {
    navigate(`/doctorbyhospitalid/${id}/department/${departmentId}`);
    console.log(id);
    console.log(departmentId);
  };

  useEffect(() => {
    getDepartmentDetails();
  }, []);

  return (
    <div className="depart">
      <UserSidebar />
      <div className="department">
        {department.map((item, index) => {
          return (
            <div className="dep">
              <div className="details">
                <img
                  className="depimage"
                  onClick={() => getDoctorByHospitalId(item._id)}
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
  );
};

export default DepartmentByHospitalId;

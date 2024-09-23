import './department.css';
import axios from '../../utils/axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserSidebar from '../../components/UserSidebar';

const Department = () => {
  const navigate = useNavigate();
  const [department, setDepartment] = useState([]);
  const getDepartmentDetails = async () => {
    const response = await axios.get('/department');
    setDepartment(response.data);
    console.log(response.data);
  };

  const doctByDept = departmentId => {
    navigate(`/doctorbydepartmentid/${departmentId}`);
  };

  useEffect(() => {
    getDepartmentDetails();
  }, []);

  return (
    <>
      <div className="departmain">
        <UserSidebar />
        <div className="carddetails">
          {department.map((item, index) => {
            return (
              <div className="card">
                <div className="departcard">
                  <img
                    onClick={() => doctByDept(item._id)}
                    className="dimage"
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
    </>
  );
};

export default Department;

import './main.css';
import { useNavigate, NavLink } from 'react-router-dom';

const Main = () => {
  return (
    <div className="mainpage">
      <div className="mains">
        <div className="mainlogo"></div>
        <div className="maindet">
          {/* <div className="adminlo">
            <img className="imagesize" src="/adminlo1.png" alt="" />
            <p>
              <NavLink className="links" to="">
                ADMIN
              </NavLink>
            </p>
          </div> */}
          <div className="doctlo">
            <img className="imagesize" src="/doclo.png" alt="" />
            <p>
              <NavLink className="links" to="/doctor/login">
                DOCTOR
              </NavLink>
            </p>
          </div>
          <div className="userlo">
            <img className="imagesize" src="/userlo4.png" alt="" />
            <p>
              <NavLink className="links" to="/user/login">
                USER
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;

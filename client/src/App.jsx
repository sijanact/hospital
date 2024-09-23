import { Routes, Route } from 'react-router-dom';
import UserBooking from './pages/UserBooking';
import Main from './pages/main';
import Hospital from './pages/Hospital';
import MySlot from './pages/Myslots';
import Slot from './pages/AddSlot';
import DocProfile from './pages/DocProfile';
import DepartmentByHospitalId from './pages/DepartmentByHospitalId';
import DoctorByHospitalId from './pages/DoctorByHospitalId';
import DoctorByDepartmentId from './pages/DoctorByDepartmentId';
import Department from './pages/Department';
import Doctor from './pages/Doctor';
import DocLogin from './pages/DocLogin';
import UserLogin from './pages/UserLogin';
import DocHome from './pages/DocHome';
import DocBooking from './pages/DocBooking';
import PrivateRoute from './components/PrivateRoute';
import DocForgot from './pages/DocForgot';
import DocReset from './pages/DocReset';
import UserSignup from './pages/UserSignup';
import DocSignup from './pages/DocSignup';
import UserHome from './pages/UserHome';
import ForgotPass from './pages/ForgotPass';
import ResetPass from './pages/ResetPass';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/hospital" element={<Hospital />} />
        <Route path="/department" element={<Department />} />
        <Route path="/doctor" element={<Doctor />} />

        <Route path="/user/signup" element={<UserSignup />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/home" element={<UserHome />} />
        <Route
          path="/departmentbyhospitalid/:id"
          element={<DepartmentByHospitalId />}
        />
        <Route
          path="/doctorbyhospitalid/:id/department/:departmentid"
          element={<DoctorByHospitalId />}
        />
        <Route
          path="/doctorbydepartmentid/:id"
          element={<DoctorByDepartmentId />}
        />
        <Route path="/docprofile/:id" element={<DocProfile />} />
        <Route path="/user/bookings" element={<UserBooking />} />

        <Route path="/user/forgot" element={<ForgotPass />} />
        <Route path="/user/reset/:id" element={<ResetPass />} />

        <Route path="/doctor/login" element={<DocLogin />} />
        <Route path="/doctor/signup" element={<DocSignup />} />
        <Route path="/doctor/forgot" element={<DocForgot />} />
        <Route path="/doctor/reset/:id" element={<DocReset />} />

        <Route path="doctor/slot" element={<Slot />} />
        <Route path="doctor/myslot" element={<MySlot />} />
        <Route element={<PrivateRoute role="DOCTOR" />}>
          <Route path="/doctor/home" element={<DocHome />} />
          <Route path="/doctor/bookings" element={<DocBooking />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;

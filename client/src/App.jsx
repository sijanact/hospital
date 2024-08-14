import { Routes, Route } from 'react-router-dom';
import DocLogin from './pages/DocLogin';
import UserLogin from './pages/UserLogin';
import DocHome from './pages/DocHome';
import DocBooking from './pages/DocBooking';
import PrivateRoute from './components/PrivateRoute';
import UserSignup from './pages/UserSignup';
import UserHome from './pages/UserHome';
import ForgotPass from './pages/ForgotPass';
import ResetPass from './pages/ResetPass';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/doctor/login" element={<DocLogin />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/signup" element={<UserSignup />} />
        <Route path="/user/home" element={<UserHome />} />
        <Route path="/forgot" element={<ForgotPass />} />
        <Route path="/reset/:id" element={<ResetPass />} />
        <Route element={<PrivateRoute role="DOCTOR" />}>
          <Route path="/doctor/home" element={<DocHome />} />
          <Route path="/doctor/bookings" element={<DocBooking />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;

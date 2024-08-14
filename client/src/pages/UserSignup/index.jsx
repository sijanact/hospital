import { Input, Button } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';
import './usersignup.css';
import { ToastContainer, toast } from 'react-toastify';

const UserSignup = () => {
  const navigate = useNavigate();
  const [signup, setSignup] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const onChange = (e, key) => {
    setSignup({ ...signup, [key]: e.target.value });
    console.log(signup);
  };

  const onSignup = async () => {
    try {
      const response = await axios.post('user/sign-up', signup);

      navigate('/user/home');
    } catch (e) {
      toast.error('Email or Password incorrect');
    }
  };

  const onLogin = () => {
    navigate('/user/login');
  };

  return (
    <div className="user-signup-form">
      <ToastContainer />
      <h1>User Signup</h1>
      <label>First Name</label>
      <Input onChange={e => onChange(e, 'firstName')} />
      <label>Last Name</label>
      <Input onChange={e => onChange(e, 'lastName')} />
      <label>Email</label>
      <Input onChange={e => onChange(e, 'email')} />
      <label>Password</label>
      <Input type="password" onChange={e => onChange(e, 'password')} />
      <label> Confirm Password</label>
      <Input type="password" onChange={e => onChange(e, 'confirmPassword')} />

      <br />
      <div className="login">
        <Button className="btn" onClick={onSignup}>
          Sign up
        </Button>

        <p>
          Already have an account?
          <span onClick={onLogin} className="signup">
            Login now
          </span>
        </p>
      </div>
    </div>
  );
};

export default UserSignup;

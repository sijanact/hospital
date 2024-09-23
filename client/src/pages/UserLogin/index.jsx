import { Input, Button } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';
import './userlogin.css';
import { ToastContainer, toast } from 'react-toastify';

const UserLogin = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const onChange = (e, key) => {
    setLogin({ ...login, [key]: e.target.value });
    console.log(login);
  };

  const onLogin = async () => {
    try {
      const response = await axios.post(`user/login`, login);
      console.log(response.data);
      localStorage.setItem('ID', response.data.id);
      navigate('/user/home');
    } catch (e) {
      toast.error('Email or Password incorrect');
    }
  };

  const onSignup = () => {
    navigate('/user/signup');
  };

  const onForgot = () => {
    navigate('/user/forgot');
  };

  return (
    <div className="main">
      <div className="user-login-form">
        <ToastContainer />
        <h1>User Login</h1>
        <label>Email</label>
        <Input onChange={e => onChange(e, 'email')} />
        <label>Password</label>
        <Input type="password" onChange={e => onChange(e, 'password')} />
        <p className="p1" onClick={onForgot}>
          Forgot password?
        </p>
        <br />
        <div className="login">
          <Button className="btn" onClick={onLogin}>
            Login
          </Button>

          <p>
            Don't have an account?{' '}
            <span onClick={onSignup} className="signup">
              Signup
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;

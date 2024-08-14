import { Input, Button } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';
import './doclogin.css';
import { ToastContainer, toast } from 'react-toastify';

const DocLogin = () => {
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
      const response = await axios.post('doctor/login', login);

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('ID', response.data.id);

      console.log(response.data.token);
      console.log(response.data.id);
      navigate('/doctor/home');
    } catch (e) {
      toast.error('Email or Password incorrect');
    }
  };

  return (
    <div className="doc-login-form">
      <ToastContainer />
      <h1>Doctor Login</h1>
      <label>Email</label>
      <Input onChange={e => onChange(e, 'email')} />
      <label>Password</label>
      <Input type="password" onChange={e => onChange(e, 'password')} />
      <p className="p1">Forgot password?</p>
      <br />
      <div className="login">
        <Button className="btn" onClick={onLogin}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default DocLogin;

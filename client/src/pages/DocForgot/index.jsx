import { Input, Button } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';
import './docforgot.css';
import { ToastContainer, toast } from 'react-toastify';

const DocForgot = () => {
  const navigate = useNavigate();
  const [forgot, setForgot] = useState({
    email: '',
  });

  const onChange = (e, key) => {
    setForgot({ ...forgot, [key]: e.target.value });

    console.log(forgot);
  };

  const onContinue = async () => {
    try {
      const response = await axios.post('doctor/forgot-password', forgot);
      // console.log(response);

      localStorage.setItem('token', response.data.resetToken);

      // console.log(response.data.resetToken);
      toast.error('Check mail');
      // navigate(`/doctor/reset/${response.data.resetToken}`);
    } catch (e) {
      console.log(e);
      toast.error('Email or Password incorrect');
    }
  };

  return (
    <div className="main">
      <div className="forgot">
        <ToastContainer />
        <h1>Forgot Password</h1>
        <label>Enter email address</label>
        <Input placeholder="Email" onChange={e => onChange(e, 'email')} />
        <div className="continue">
          <Button className="btn" onClick={onContinue}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DocForgot;

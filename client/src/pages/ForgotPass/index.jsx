import { Input, Button } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';
import './forgotpass.css';
import { ToastContainer, toast } from 'react-toastify';

const ForgotPass = () => {
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
      const response = await axios.post('user/forgot-password', forgot);
      console.log(response);

      localStorage.setItem('token', response.data.resetToken);
      console.log(response.data.resetToken);

      navigate(`/reset/${response.data.resetToken}`);
    } catch (e) {
      console.log(e);
      toast.error('Email or Password incorrect');
    }
  };

  return (
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
  );
};

export default ForgotPass;

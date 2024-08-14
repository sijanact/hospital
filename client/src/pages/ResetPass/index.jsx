import { Input, Button } from 'antd';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../utils/axios';
import './resetpass.css';
import { ToastContainer, toast } from 'react-toastify';

const ResetPass = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [reset, setReset] = useState({
    password: '',
    confirmPassword: '',
  });

  const onChange = (e, key) => {
    setReset({ ...reset, [key]: e.target.value });

    console.log(reset);
  };

  const onReset = async () => {
    try {
      const response = await axios.post(`user/reset/${id}`, reset);
    } catch (e) {
      console.log(e);
      toast.error('Email or Password incorrect');
    }
  };

  return (
    <div className="reset">
      <ToastContainer />
      <h1>Reset Password</h1>
      <label>Password</label>
      <Input onChange={e => onChange(e, 'password')} />
      <label>Confirm Password</label>
      <Input onChange={e => onChange(e, 'confirmPassword')} />
      <div className="continue">
        <Button className="btn" onClick={onReset}>
          Reset Password
        </Button>
      </div>
    </div>
  );
};

export default ResetPass;

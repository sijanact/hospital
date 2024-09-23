import { Input, Button } from 'antd';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../utils/axios';
import './docreset.css';
import { ToastContainer, toast } from 'react-toastify';

const DocReset = () => {
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
      const response = await axios.post(`doctor/reset/${id}`, reset);
      toast('Password reset successfully');
    } catch (e) {
      console.log(e);
      toast.error('Email or Password incorrect');
    }
  };

  return (
    <div className="main">
      <div className="reset">
        <ToastContainer />
        <h1>Reset Password</h1>
        <label>Password</label>
        <Input type="password" onChange={e => onChange(e, 'password')} />
        <label>Confirm Password</label>
        <Input type="password" onChange={e => onChange(e, 'confirmPassword')} />
        <div className="continue">
          <Button className="btn" onClick={onReset}>
            Reset Password
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DocReset;

import { Input, Button } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';
import './docsignup.css';
import { ToastContainer, toast } from 'react-toastify';

const DocSignup = () => {
  const navigate = useNavigate();
  const [signup, setSignup] = useState({
    firstName: '',
    lastName: '',
    email: '',
    qualification: '',
    department: '',
    hospital: '',
  });

  const onChange = (e, key) => {
    setSignup({ ...signup, [key]: e.target.value });
    console.log(signup);
  };

  const onSignup = async () => {
    try {
      const response = await axios.post('doctor/sign-up', signup);

      toast('You have successfully signed up');
      setSignup({
        firstName: '',
        lastName: '',
        email: '',
        qualification: '',
        department: '',
        hospital: '',
      });
    } catch (e) {
      toast.error('Email or Password incorrect');
    }
  };

  const onLogin = () => {
    navigate('/doctor/login');
  };

  return (
    <div className="main">
      <div className="doc-signup-form">
        <ToastContainer />
        <h1>Doctor Signup</h1>
        <label>First Name</label>
        <Input
          value={signup.firstName}
          onChange={e => onChange(e, 'firstName')}
        />
        <label>Last Name</label>
        <Input
          value={signup.lastName}
          onChange={e => onChange(e, 'lastName')}
        />
        <label>Email</label>
        <Input value={signup.email} onChange={e => onChange(e, 'email')} />
        <label>Qualification</label>
        <Input
          value={signup.qualification}
          onChange={e => onChange(e, 'qualification')}
        />

        <label> Department</label>
        <Input
          value={signup.department}
          onChange={e => onChange(e, 'department')}
        />
        <label> Hospital</label>
        <Input
          value={signup.hospital}
          onChange={e => onChange(e, 'hospital')}
        />

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
    </div>
  );
};

export default DocSignup;

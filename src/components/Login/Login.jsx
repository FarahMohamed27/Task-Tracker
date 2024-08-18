import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Logo from '../../assets/logo-no-background.png'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {authActions} from '../../store/AuthSlice';
import { getUserData } from '../../store/AuthSlice';

export default function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  // const email = useSelector((state) => state.Auth.email);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // const response = await axios.get(`http://localhost:3001/userData?email=${email}`)
  // const userData = response.data[0];
  // console.log(userData)
  // if(userData && (password === userData.password)){
  //   dispatch(authActions.login({
  //     email: userData.email,
  //     userName: userData.userName,
  //     phone: userData.phone
  //   }))

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(getUserData({
        email: email,
        password: password
      }))
        navigate('/');
      }
      else {
        console.log('Invalid login credentials');
      } 
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <img src={Logo} className='Login-logo'/>
        <h2 className='login-title'>Login</h2>
        <p className='login-paragraph'>Welcome To task Tracker, Please Login</p>
        <div className='form-inputs'>
          <input
            className='form-login-input'
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={handleEmailChange}
          />
          <input
            className='form-login-input'
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            minLength={8}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" className="show-password-btn" onClick={togglePasswordVisibility} > {showPassword ? <VisibilityOffIcon/> : <VisibilityIcon/>} </button>
        </div>
          <button type="submit" className='form-login-btn'>Login</button>
      </form>
    </div>
  );
}

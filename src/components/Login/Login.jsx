import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Logo from '../../assets/logo-no-background.png'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem('authenticated', 'true');
      navigate('/');
    } 
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
            onChange={(e) => setEmail(e.target.value)}
            required
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

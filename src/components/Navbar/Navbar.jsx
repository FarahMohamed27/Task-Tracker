import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import Logo from '../../assets/logo-no-background.png'
import { useSelector, useDispatch } from 'react-redux'
import {logout} from '../../store/AuthSlice'

export default function Navbar() {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state)=> state.Auth.isAuthenticated);
    const navigate = useNavigate();

    const handleAuthButton = () => {
        if (isAuthenticated) {
          dispatch(logout());
          navigate('/');
        } else {
          navigate('/login');   
        }
      };

  return (
    <div className='Navbar-container'>
      <img src={Logo} alt="Logo" className='Navbar-logo'/>
      <button onClick={handleAuthButton} className='auth-button'> {isAuthenticated ? 'Logout' : 'Login'}</button>
    </div>
  )
}

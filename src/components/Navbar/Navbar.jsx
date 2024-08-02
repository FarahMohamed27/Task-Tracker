import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import Logo from '../../assets/logo-no-background.png'

export default function Navbar() {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    useEffect(() => {
      const authStatus = localStorage.getItem('authenticated') === 'true';
      setIsAuthenticated(authStatus);
    }, []);

    const handleAuthButton = () => {
        if (isAuthenticated) {
          localStorage.removeItem('authenticated');
          setIsAuthenticated(false);
          navigate('/');
        } else {
          navigate('/login');
        }
      };

  return (
    <div className='Navbar-container'>
      {/* <h2 className='Navbar-title'>Task Tracker</h2> */}
      <img src={Logo} alt="Logo" className='Navbar-logo'/>
      <button onClick={handleAuthButton} className='auth-button'> {isAuthenticated ? 'Logout' : 'Login'}</button>
    </div>
  )
}

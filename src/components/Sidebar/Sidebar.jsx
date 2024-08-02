import React, { useState } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const [activeLink, setActiveLink] = useState('/');

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <div className='sidebar-container'>
      <h2 className='sidebar-title'>Choose The Status You Want To Show</h2>
      <ul className='list-container'>
        <Link to="/" onClick={() => handleLinkClick('/')}>
          <li className={`list-item ${activeLink === '/' ? 'active' : ''}`}>All Tasks</li>
        </Link>
        <Link to="/status/finished" onClick={() => handleLinkClick('/status/finished')}>
          <li className={`list-item ${activeLink === '/status/finished' ? 'active' : ''}`}>Finished</li>
        </Link>
        <Link to="/status/in progress" onClick={() => handleLinkClick('/status/in progress')}>
          <li className={`list-item ${activeLink === '/status/in progress' ? 'active' : ''}`}>In Progress</li>
        </Link>
        <Link to="/status/not started" onClick={() => handleLinkClick('/status/not started')}>
          <li className={`list-item ${activeLink === '/status/not started' ? 'active' : ''}`}>Not Started</li>
        </Link>
      </ul>
    </div>
  );
}

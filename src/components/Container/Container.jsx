import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import RightContent from '../RightContent/RightContent'
import './Container.css'
import Navbar from '../Navbar/Navbar'

export default function Container() {
  return (
    <div className='container'>
        <Navbar/>
        <div className='container-body'>
          <Sidebar/>
          <RightContent/>
        </div>
    </div>
  )
}

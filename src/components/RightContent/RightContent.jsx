import React from 'react'
import './RightContent.css'
import HeaderImage from '../../assets/white-clipboard-task-management-todo-check-list-efficient-work-on-project-plan-fast-progress-level-up-concept-assignment-and-exam-productivity-solution-icon-3d-render-on-pink-background-free-png.webp'
import Tasks from '../Tasks/Tasks'
export default function RightContent() {
  return (<>
   <div className='right-container'>
    <div className='intro-container'>
      <div className='welcome-container'>
        <div className='Logo'>
          Task Tracker
        </div>
              <p className='welcome-paragraph'>Welcome to Task Tracker, Here we will help you to organize and track all your tasks</p>
       </div>
              <img src={HeaderImage} className='header-img'/>
    </div>
    <Tasks/>
   </div>
    
   
   
  </>
    
  )
}

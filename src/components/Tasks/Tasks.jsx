import React, { useState, useEffect } from 'react'
import './Tasks.css'
import Backdrop from '../Backdrop/Backdrop';
import TaskForm from '../TaskForm/TaskForm';
import {useParams} from 'react-router-dom';
import Pagination from '@mui/material/Pagination';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [view, setView] = useState(false);
  const TasksPerPage = 4;

  const {status} = useParams();

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  function handleAddTask(){
    setIsFormOpen(true);
    setCurrentTask(null);
    setView(false);
  }

  function handleEditTask(task){
      setView(false);
      setIsFormOpen(true);
      setCurrentTask(task);
  }
  function handleDeleteTask(index){
    const updatedTasks = tasks.filter((task)=> task.id !== index);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }

  function handleTaskView(task){
    setView(true);
    setCurrentTask(task)
    setIsFormOpen(true)
  }

  function handleFormSubmit(task){
    const updatedTasks = currentTask
    ? tasks.map(t => t.id === task.id ? task : t)
    : [...tasks, { ...task, id: Date.now() }];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setIsFormOpen(false);
  }

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };


  const filteredTasks = status ? tasks.filter(task => task.TaskStatus === status) : tasks; //*************** */
  const paginatedTasks = filteredTasks.slice((currentPage - 1) * TasksPerPage, currentPage * TasksPerPage);

  return (<>
    <div className='add-task-container'>
      <button className='add-task-btn' onClick={handleAddTask}>Add New Task</button>
    </div>
    <div className='tasks-container'> 
      {paginatedTasks.length === 0 && currentPage === 1 &&
        <h2 className='empty-tasks'>No tasks available</h2>
      }
      {paginatedTasks.length === 0 && currentPage !== 1 &&
        <h2 className='empty-tasks'>No tasks available in this page</h2>
      }
      {paginatedTasks.map((item, index) => <div key={index} className={`task-card ${item.TaskStatus === 'in progress' ? 'in-progress' : item.TaskStatus === 'not started'? 'not-started' : 'finished'}`}> 
        <h2 className='task-title'>{item.title}</h2>
        <h3 className='task-status'>{item.TaskStatus}</h3>
        <p className='task-description'>{item.description === ''? `No Description` : item.description}</p>
        <div className='task-actions'>
            <button className='edit-btn' onClick={()=> handleEditTask(item)}>Edit</button>
            <button className='delete-btn' onClick={()=> handleDeleteTask(item.id)}>Delete</button>
            <button className='view-btn' onClick={() => handleTaskView(item)} >View</button>
        </div>
        
      </div>)}
    </div>
    <div className='tasks-pagination'>
      <Pagination count={Math.ceil(filteredTasks.length / TasksPerPage)} page={currentPage} onChange={handlePageChange} variant="outlined" color="primary" />
    </div>

    {isFormOpen && !view && (
        <Backdrop onClose={() => setIsFormOpen(false)}>
          <TaskForm
            initialData={currentTask || { title: '', description: '', TaskStatus: 'not started' }}
            onSubmit={handleFormSubmit}
            onCancel={() => setIsFormOpen(false)}
          />
        </Backdrop>
      )}
      {isFormOpen && view && (
        <Backdrop onClose={() => setIsFormOpen(false)}>
          <div className={`backdrop-task ${currentTask.TaskStatus === 'in progress' ? 'in-progress-bd' : currentTask.TaskStatus === 'not started'? 'not-started-bd' : 'finished-bd'}`}>
              <h2 className='backdrop-task-title'>{currentTask.title}</h2>
              <h3 className='backdrop-task-status'>{currentTask.TaskStatus}</h3>
                <textarea
              value={currentTask.description  === ''? "No Descritpion" : currentTask.description }
              className='backdrop-task-desc'
              readOnly = {true}
              />
              <button onClick={()=> setIsFormOpen(false)} className='backdrop-task-close'>close</button>
          </div>
        </Backdrop>
      )}
  </>
  )
}

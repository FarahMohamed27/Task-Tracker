import React, { useState, useEffect } from 'react'
import './Tasks.css'
import Backdrop from '../Backdrop/Backdrop';
import TaskForm from '../TaskForm/TaskForm';
import {useParams} from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { tasksActions } from '../../store/tasksSlice';
import useData from '../../hooks/useData';
import { deleteTask, submitForm } from '../../store/tasksSlice';

export default function Tasks() {
  const { tasks, isLoading, isError, refreshData } = useData();
  const dispatch = useDispatch();
  const isFormOpen = useSelector((state) => state.tasks.isFormOpen);
  const currentTask = useSelector((state) => state.tasks.currentTask);
  const currentPage = useSelector((state) => state.tasks.currentPage);
  const view = useSelector((state)=> state.tasks.view);
  const TasksPerPage = 4;

  const {status} = useParams();
  

  useEffect(() => {
    dispatch(tasksActions.setTasks(tasks));
  }, [tasks, dispatch]);

  function handleAddTask(){
      dispatch(tasksActions.addTask());
  }

  function handleEditTask(task){
      dispatch(tasksActions.editTask(task))
  }
 
  async function handleDeleteTask(id){
    try {
      dispatch(deleteTask({id:id}))
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }

  function handleTaskView(task){
    dispatch(tasksActions.setIsFormOpen(true));
    dispatch(tasksActions.setView(true));
    dispatch(tasksActions.setCurrentTask(task));
  }

  async function handleFormSubmit(task){
    console.log('Submitting Task:', task);
    dispatch(submitForm({task:task}));
  }

  const handlePageChange = (event, value) => {
    dispatch(tasksActions.setCurrentPage(value));
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
      {paginatedTasks?.map((item, index) => <div key={index} className={`task-card ${item.TaskStatus === 'in progress' ? 'in-progress' : item.TaskStatus === 'not started'? 'not-started' : 'finished'}`}> 
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
        
        <Backdrop onClose={() => dispatch(tasksActions.setIsFormOpen(false))}>
          <TaskForm
            onSubmit={handleFormSubmit}
            onCancel={() => dispatch(tasksActions.setIsFormOpen(false))}
          />
        </Backdrop>
      )}
      {isFormOpen && view && (
        <Backdrop onClose={() => dispatch(tasksActions.setIsFormOpen(false))}>
          <div className={`backdrop-task ${currentTask.TaskStatus === 'in progress' ? 'in-progress-bd' : currentTask.TaskStatus === 'not started'? 'not-started-bd' : 'finished-bd'}`}>
              <h2 className='backdrop-task-title'>{currentTask.title}</h2>
              <h3 className='backdrop-task-status'>{currentTask.TaskStatus}</h3>
                <textarea
              value={currentTask.description  === ''? "No Descritpion" : currentTask.description }
              className='backdrop-task-desc'
              readOnly = {true}
              />
              <button onClick={()=> dispatch(tasksActions.setIsFormOpen(false))} className='backdrop-task-close'>close</button>
          </div>
        </Backdrop>
      )}
  </>
  )
}

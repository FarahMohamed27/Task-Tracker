import React, { useState, useEffect } from 'react';
import './TaskForm.css' 
import { useSelector, useDispatch } from 'react-redux';


export default function TaskForm({ onSubmit, onCancel }) {
    const currentTask = useSelector((state) => state.tasks.currentTask);
    const [title, setTitle] = useState(currentTask?.title || '');
    const [description, setDescription] = useState(currentTask?.description || '');
    const [TaskStatus, setStatus] = useState(currentTask?.TaskStatus || 'not started');
  
    useEffect(() => {
      setTitle(currentTask?.title || '');
      setDescription(currentTask?.description || '');
      setStatus(currentTask?.TaskStatus || 'not started');
    }, [currentTask]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit({ id: currentTask?.id || Date.now(), title, description, TaskStatus });
    };
  
    return (
      <form onSubmit={handleSubmit} className='form-container'>
        <div className='title'>
          <label className='form-label'>Title:</label>
          <input
            type="text"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            className='form-title-input'
          />
        </div>
        <div>
          <label className='form-label'>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='form-desc-input'
          />
        </div>
        <div>
          <label className='form-label'>Status:</label>
          <select value={TaskStatus} onChange={(e) => setStatus(e.target.value)} className='form-selection'>
            <option value="not started" className='form-option'>Not Started</option>
            <option value="in progress" className='form-option'>In Progress</option>
            <option value="finished" className='form-option'>Finished</option>
          </select>
        </div>
        <div className='form-actions'>
            <button type="button" onClick={onCancel} className='form-close-btn'>close</button>
            <button type="submit" className='form-submit-btn'>Save</button>
        </div>
      </form>
    );
}





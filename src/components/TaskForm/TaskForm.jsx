import React, { useState, useEffect } from 'react';
import './TaskForm.css' 



export default function TaskForm({ initialData, onSubmit, onCancel }) {
    const [title, setTitle] = useState(initialData.title || '');
    const [description, setDescription] = useState(initialData.description || '');
    const [TaskStatus, setStatus] = useState(initialData.TaskStatus || 'not started');
  
    useEffect(() => {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setStatus(initialData.TaskStatus || 'not started');
    }, [initialData]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit({ id: initialData.id || Date.now(), title, description, TaskStatus });
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





import { useState } from 'react';

import { CheckIcon, PlusIcon } from '@heroicons/react/24/solid';
import { useEffect } from 'react';

const EditForm = ({ editedTask, updateTask, closeEditMode }) => {
  const [updatedTaskName, setUpdatedTaskName] = useState(editedTask.name);

  useEffect(() => {
    const closeModelIfEscaped = (e) => {
      e.key === 'Escape' && closeEditMode();
    };
    window.addEventListener('keydown', closeModelIfEscaped);

    return () => {
      window.removeEventListener('keydown', closeModelIfEscaped);
    };
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    updateTask({ ...editedTask, name: updatedTaskName });
  };

  return (
    <div
      role='dialog'
      aria-labelledby='editTask'
      // onClick={}
    >
      <form className='todo' onSubmit={handleFormSubmit}>
        <div className='wrapper'>
          <input
            type='text'
            id='editTask'
            className='input'
            value={updatedTaskName}
            onInput={(e) => setUpdatedTaskName(e.target.value)}
            required
            autoFocus
            maxLength={60}
            placeholder='Enter Task'
          />
          <label htmlFor='editTask' className='label'>
            Update Task
          </label>
        </div>
        <button
          className='btn'
          aria-label={`Confirm edited task to now read ${updatedTaskName}`}
          type='submit'
        >
          <CheckIcon strokeWidth={2} width={24} height={24} />
        </button>
      </form>
    </div>
  );
};
export default EditForm;

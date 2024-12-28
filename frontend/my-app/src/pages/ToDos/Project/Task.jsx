import React from 'react';

const Task = ({ task, onToggle, onDelete }) => (
  <li>
    <input
      type="checkbox"
      checked={task.completed}
      onChange={() => onToggle(task.id)}
    />
    {task.text}
    <button onClick={() => onDelete(task.id)}>Delete</button>
  </li>
);

export default Task;

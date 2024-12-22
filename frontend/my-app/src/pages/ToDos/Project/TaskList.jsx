import React, { useState } from 'react';
import Task from './Task';

const TaskList = ({ tasks, onToggleTask, onDeleteTask }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onToggle={onToggleTask}
          onDelete={onDeleteTask}
        />
      ))}
    </ul>
  );
};

export default TaskList;

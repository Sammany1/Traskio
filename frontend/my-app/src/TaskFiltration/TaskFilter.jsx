import React, { useState } from 'react';

const TaskFilter = () => {
  const [filter, setFilter] = useState('All');

  const tasks = [
    { id: 1, title: 'Task 1', status: 'Completed' },
    { id: 2, title: 'Task 2', status: 'In Progress' },
    { id: 3, title: 'Task 3', status: 'Completed' },
    { id: 4, title: 'Task 4', status: 'In Progress' },
  ];

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredTasks =
    filter === 'All'
      ? tasks
      : tasks.filter((task) => task.status === filter);

  return (
    <div className="task-filter-container">
      <h1>Task Filter</h1>
      <div className="filter-dropdown">
        <label htmlFor="filter">Filter tasks: </label>
        <select id="filter" value={filter} onChange={handleFilterChange}>
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="In Progress">In Progress</option>
        </select>
      </div>

      <div className="task-list">
        <h2>Tasks ({filter})</h2>
        {filteredTasks.map((task) => (
          <div key={task.id} className="task-item">
            {task.title} - <strong>{task.status}</strong>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskFilter;



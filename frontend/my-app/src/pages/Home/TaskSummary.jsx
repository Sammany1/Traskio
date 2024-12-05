import React from 'react';

const TaskSummary = () => {
  return (
    <div className="task-summary">
      <h3>Task Summary</h3>
      <p>Here’s a quick overview of your tasks for today:</p>
      <ul>
        <li>Complete the report by 2 PM</li>
        <li>Team meeting at 3 PM</li>
        <li>Review the project proposal</li>
      </ul>
    </div>
  );
};

export default TaskSummary;

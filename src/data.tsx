import React, { useEffect, useState } from 'react';

const Data: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    fetch('https://localhost:7281/tasks')
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div className="App">
      <h1>Lista zadań</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.name} - {task.description} - {task.isCompleted ? 'true' : 'false'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Data;

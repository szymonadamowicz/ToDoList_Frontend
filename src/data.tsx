import React, { useEffect, useState } from 'react';

const Data: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    fetch('https://localhost:7140/tasks')
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error('Error:', error));
  }, [counter]);

  const handleClickAdd = () => {
    fetch('https://localhost:7140/tasks', 
        {method: "post", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({name:"new", description: "desc", isCompleted: true})})
    .then((response) => response.json())
    .then((data) => console.log("Task added:", data))
    .then((data) => setCounter(counter+1))
    .catch((error) => console.error("Error adding task:", error));
  }

  const handleClickRemove = () => {
    fetch(`https://localhost:7140/tasks/${6}`, { method: "DELETE" })
    .then((data) => setCounter(counter+1))
    .catch((error) => console.error("Error removing task:", error));
  }

  return (
    <div className="App">
      <h1>Lista zadań</h1>
      <button onClick={handleClickAdd}>asd</button>
      <button onClick={handleClickRemove}>asd</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={task.id + index}>
            {task.name} - {task.description} - {task.isCompleted ? 'true' : 'false'} - {task.id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Data;

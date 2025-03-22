import { useState } from "react";
import { useTaskService } from "../services/ApiService";

const MainPage = () => {
    const { tasks, addTask, removeTask, swapTasks } = useTaskService();
    const [firstId, setFirstId] = useState("");
    const [secondId, setSecondId] = useState("");

  
  return (
    <div className="App">
      <h1>Lista zadań</h1>
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <button onClick={() => removeTask(task.id)}>Delete</button>
            {task.name} - {task.description} -{" "}
            {task.isCompleted ? "true" : "false"} - {task.id}
          </li>
        ))}
      </ul>
      <input onChange={(e) => setFirstId(e.target.value)} value={firstId} />
      <p>{firstId}</p>
      <input onChange={(e) => setSecondId(e.target.value)} value={secondId} />
      <p>{secondId}</p>
      <button
        onClick={() => swapTasks(parseInt(firstId), parseInt(secondId))}
      >
        Swap
      </button>
    </div>
  );
};

export default MainPage
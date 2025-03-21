import React, { useEffect, useState } from "react";

const Data: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    fetch("https://localhost:7140/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error:", error));
  }, [counter]);

  const handleClickAdd = () => {
    fetch("https://localhost:7140/tasks/add", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "new",
        description: "desc",
        isCompleted: true,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        setCounter(counter + 1);
      })
      .catch((error) => console.error("Error adding task:", error));
  };

  const handleClickRemove = (Id: number) => {
    fetch(`https://localhost:7140/tasks/${Id}`, { method: "DELETE" })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          console.log(data.message);
          setCounter(counter + 1);
        }
      })
      .catch((error) => console.error("Error removing task:", error));
  };

  const handleSwapId = (Id1: number, Id2: number) => {
    fetch(`https://localhost:7140/tasks/swap?task1Id=${Id1}&task2Id=${Id2}`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        setCounter(counter + 1);
      })
      .catch((error) => console.error("Error swapping tasks:", error));
  };

  const [firstId, setFirstId] = useState("");
  const [secondId, setSecondId] = useState("");

  return (
    <div className="App">
      <h1>Lista zadań</h1>
      <button onClick={handleClickAdd}>Add</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <button onClick={() => handleClickRemove(task.id)}>Delete</button>
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
        onClick={() => handleSwapId(parseInt(firstId), parseInt(secondId))}
      >
        Swap
      </button>
    </div>
  );
};

export default Data;

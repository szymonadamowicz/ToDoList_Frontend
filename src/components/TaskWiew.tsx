import { useState } from "react";
import { useTaskService } from "../services/ApiService";

const TaskView = () => {
  const { tasks, addTask, removeTask, swapTasks, setCompleted, isError, isLoading } =
    useTaskService();
  const [firstId, setFirstId] = useState("");
  const [secondId, setSecondId] = useState("");


  return (
    <div
      style={{
        background: "pink",
        display: "flex",
        flex: 1,
        gap: 35,
        flexWrap: "wrap",
        justifyContent: "center",
        height: "auto",
        margin: "20px",
        marginTop: "20px",
        padding: "20px",
      }}
    >
      {isLoading && <div>fetching data...</div>}
      {isError && <div>error fetching data</div>}
      {tasks.map((item) => (
        <div
          key={item.id}
          style={{
            backgroundColor: "blue",
            height: "250px",
            display: "flex",
            flex: 1,
            minWidth: "300px",
            maxWidth: "350px",
            alignSelf: "center",
          }}
        >
          <button onClick={() => removeTask(item.id)}>remove</button>
          {item.id}
        </div>
      ))}
    </div>
  );
};

export default TaskView;

//   <input onChange={(e) => setFirstId(e.target.value)} value={firstId} />
//       <p>{firstId}</p>
//       <input onChange={(e) => setSecondId(e.target.value)} value={secondId} />
//       <p>{secondId}</p>
//       <button
//         onClick={() => swapTasks(parseInt(firstId), parseInt(secondId))}
//       >
//         Swap
//       </button>
//       <button onClick={()=>console.log(tasks)}>console.log tasks data</button>

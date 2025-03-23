import { useContext } from "react";
import { TaskContext } from "../pages/MainPage";

const TaskView = () => {
  const { tasks, removeTask, isError, isLoading } = useContext(TaskContext)!;

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
            position: "relative",
            border: item.isCompleted
              ? "3px solid greenyellow"
              : "3px solid black",
          }}
        >
          <button
            style={{ position: "absolute", top: 5, right: 5 }}
            onClick={() => removeTask(item.id)}
          >
            remove
          </button>
          <div style={{ padding: 10, width: "100%" }}>
            <h3 style={{ width: "70%", marginTop: "10px" }}>{item.name}</h3>
            <div
              style={{
                width: "100%",
                borderBottom: "1px solid black",
                marginBottom: "10px",
              }}
            />
            <div>{item.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskView;
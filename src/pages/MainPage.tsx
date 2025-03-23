import { createContext } from "react";
import Navbar from "../components/Navbar";
import TaskView from "../components/TaskWiew";
import { useTaskService } from "../services/ApiService";
export const TaskContext = createContext<ReturnType<
  typeof useTaskService
> | null>(null);

const MainPage = () => {
  const taskService = useTaskService();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        height: "100%",
        backgroundColor: "red",
        minHeight: "100vh",
      }}
    >
      <TaskContext.Provider value={taskService}>
        <Navbar />
        <TaskView />
      </TaskContext.Provider>
    </div>
  );
};

export default MainPage;

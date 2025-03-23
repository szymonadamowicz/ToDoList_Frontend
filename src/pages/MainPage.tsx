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
    <div className="flex flex-col flex-1 min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <TaskContext.Provider value={taskService}>
        <Navbar />
        <TaskView />
      </TaskContext.Provider>
    </div>
  );
};

export default MainPage;

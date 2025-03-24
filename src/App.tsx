import MainPage from "./pages/MainPage";
import { Routes, Route } from "react-router-dom";
import CompletedTasks from "./pages/CompletedTasks";
import { useTaskService } from "./services/ApiService";
import { createContext } from "react";

export const TaskContext = createContext<ReturnType<
  typeof useTaskService
> | null>(null);


function App() {

  const taskService = useTaskService();

  return (
    <div>
      <TaskContext.Provider value={taskService}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/completed-tasks" element={<CompletedTasks />} />
        </Routes>
      </TaskContext.Provider>
    </div>
  );
}

export default App;

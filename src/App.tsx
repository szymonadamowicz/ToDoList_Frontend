import MainPage from "./pages/MainPage";
import { Routes, Route } from "react-router-dom";
import CompletedTasks from "./pages/CompletedTasks";
import { useTaskService } from "./services/ApiServiceTasks";
import { createContext } from "react";
import { useThemeService } from "./services/ApiServiceTheme";

export const TaskContext = createContext<ReturnType<
  typeof useTaskService
> | null>(null);
export const ThemeContext = createContext<ReturnType<
  typeof useThemeService
> | null>(null);

function App() {
  const taskService = useTaskService();
  const themeService = useThemeService();

  return ( 
    <div>
      <TaskContext.Provider value={taskService}>
        <ThemeContext.Provider value={themeService}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/completed-tasks" element={<CompletedTasks />} />
          </Routes>
        </ThemeContext.Provider>
      </TaskContext.Provider>
    </div>
  );
}

export default App;

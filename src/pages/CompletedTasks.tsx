import Navbar from "../components/Navbar";
import TaskView from "../components/TaskWiew";

const CompletedTasks = () => {
  return (
    <div className="flex flex-col flex-1 min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <Navbar isCompletedPage={true} />
      <TaskView isCompletedPage={true} />
    </div>
  );
};

export default CompletedTasks;

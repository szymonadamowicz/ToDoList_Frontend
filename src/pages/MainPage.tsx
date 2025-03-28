import Navbar from "../components/Navbar";
import TaskView from "../components/TaskWiew";

const MainPage = () => {

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
        <Navbar isCompletedPage={false} />
        <TaskView isCompletedPage={false} />
    </div>
  );
};

export default MainPage;

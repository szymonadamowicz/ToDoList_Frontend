import { useContext } from "react";
import { TaskContext } from "../pages/MainPage";

const TaskView = () => {
  const { tasks, removeTask, isError, isLoading } = useContext(TaskContext)!;

  return (
    <div className="flex flex-wrap justify-center gap-[35px] flex-1 m-5 mt-5 p-5">
      {isLoading && <div className="text-gray-800 dark:text-white">fetching data...</div>}
      {isError && <div className="text-red-500">error fetching data</div>}

      {tasks.map((item) => (
        <div
          key={item.id}
          className={`relative flex flex-col min-w-[300px] max-w-[350px] h-[250px] rounded-2xl p-4 shadow-md transition-all 
            bg-white dark:bg-gray-800 
            text-black dark:text-white 
            ${item.isCompleted ? "border-[3px] border-green-300" : "border-[3px] border-gray-300 dark:border-gray-600"}`}
        >
          <button
            className="absolute top-2 right-2 text-sm text-white bg-red-500 px-2 py-1 rounded hover:bg-red-600"
            onClick={() => removeTask(item.id)}
          >
            ✕
          </button>
          <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
          <div className="border-b border-gray-300 dark:border-gray-600 mb-2" />
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default TaskView;
import { useContext } from "react";
import { TaskContext } from "../pages/MainPage";

const TaskView = () => {
  const { tasks, removeTask, isError, isLoading } = useContext(TaskContext)!;

  return (
    <div className="bg-pink-300 flex flex-wrap justify-center gap-[35px] flex-1 m-5 mt-5 p-5">
      {isLoading && <div>fetching data...</div>}
      {isError && <div>error fetching data</div>}

      {tasks.map((item) => (
        <div
          key={item.id}
          className={`relative flex flex-1 min-w-[300px] max-w-[350px] h-[250px] bg-blue-500 ${
            item.isCompleted ? "border-[3px] border-green-300" : "border-[3px] border-black"
          }`}
        >
          <button
            className="absolute top-1 right-1 bg-white px-2 py-1 rounded shadow"
            onClick={() => removeTask(item.id)}
          >
            remove
          </button>

          <div className="p-2 w-full">
            <h3 className="w-[70%] mt-2 text-white font-bold text-lg">{item.name}</h3>
            <div className="w-full border-b border-black mb-2" />
            <div className="text-white">{item.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskView;

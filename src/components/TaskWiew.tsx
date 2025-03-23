import { useContext, useEffect, useState } from "react";
import { TaskContext } from "../pages/MainPage";
import dayjs from "dayjs";

const TaskView = () => {
  const { tasks, removeTask, setCompleted, isError, isLoading } =
    useContext(TaskContext)!;

  // eslint-disable-next-line
  const [_, setCurrentTime] = useState(new Date());
  const [loadingId, setLoadingId] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleSetCompleted = async (id: number) => {
    setLoadingId(id);
    await setCompleted(id);
    setLoadingId(null);
  };

  const getTimeRemaining = (dueDate: Date | string) => {
    const now = dayjs();
    const due = dayjs(dueDate);

    const diffInMs = due.diff(now);

    if (diffInMs <= 0) return "Past due";

    const totalMinutes = Math.floor(diffInMs / 60000);
    const days = Math.floor(totalMinutes / (60 * 24));
    const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
    const minutes = totalMinutes % 60;

    return `${days}d ${hours}h ${minutes}min`;
  };

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    tasks.forEach((task) => {
      if (task.isCompleted) {
        const timeout = setTimeout(() => {
          removeTask(task.id);
        }, 60000);
        timers.push(timeout);
      }
    });

    return () => {
      timers.forEach(clearTimeout);
    };
    // eslint-disable-next-line
  }, [tasks]);

  return (
    <div className="flex flex-wrap justify-center gap-[35px] flex-1 m-5 mt-5 p-5">
      {isLoading && tasks.length === 0 && (
        <div className="text-gray-800 dark:text-white">fetching data...</div>
      )}
      {isError && <div className="text-red-500">error fetching data</div>}

      {tasks.map((item) => (
        <div
          key={item.id}
          className={`relative flex flex-col transition-all duration-300 
      w-[320px] min-w-[300px] max-w-[350px] h-[250px] rounded-2xl p-4 pt-2 shadow-md 
      bg-white dark:bg-gray-800 
      text-black dark:text-white 
      ${
        item.isCompleted
          ? "border-[3px] border-green-300"
          : "border-[3px] border-gray-300 dark:border-gray-600"
      }`}
        >
          {loadingId === item.id ? (
            <div className="flex-1 flex flex-col justify-center items-center text-gray-500">
              <span className="text-lg font-semibold">Loading...</span>
            </div>
          ) : (
            <>
              <button
                className="absolute top-2 right-12 flex items-center justify-center text-white bg-green-500 px-2 py-1 rounded hover:bg-green-600 w-[28px] h-[28px]"
                onClick={() => handleSetCompleted(item.id)}
              >
                ✓
              </button>

              <button
                className="absolute top-2 right-2 flex items-center justify-center text-white bg-red-500 px-2 py-1 rounded hover:bg-red-600 w-[28px] h-[28px]"
                onClick={() => removeTask(item.id)}
              >
                ✕
              </button>
              <h3 className="text-xl font-semibold mb-2 w-[85%] overflow-hidden">
                {item.name}
              </h3>
              <div className="border-b border-gray-300 dark:border-gray-600 mb-2" />
              <p className="h-[65%]">{item.description}</p>
              <div className="border-b border-gray-300 dark:border-gray-600 mb-2" />
              <div className="h-[15%] content-center">
                <h3>
                  Time Left:{" "}
                  {getTimeRemaining(
                    typeof item.dueDate === "string"
                      ? new Date(item.dueDate)
                      : item.dueDate.toDate()
                  )}
                </h3>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskView;

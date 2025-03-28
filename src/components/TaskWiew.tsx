import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import CustomModal from "./Modal";
import moment, { Moment } from "moment";
import { TaskViewModel, TaskViewProps } from "../types/Types";
import { TaskContext } from "../App";
import { useTranslation } from "react-i18next";

const TaskView: React.FC<TaskViewProps> = ({ isCompletedPage }) => {
  const { tasks, removeTask, setCompleted, setHidden, isError, isLoading } =
    useContext(TaskContext)!;
  const { t }: any = useTranslation();

  // eslint-disable-next-line
  const [_, setCurrentTime] = useState(new Date());
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [dueDate, setDueDate] = useState<Moment | string>(moment());
  const [editedTaskId, setEditedTaskId] = useState<number>();
  const [fadingOutIds, setFadingOutIds] = useState<number[]>([]);

  const handleOpenModal = (task: TaskViewModel) => {
    setTaskName(task.name);
    setTaskDescription(task.description);
    setDueDate(task.dueDate);
    setEditedTaskId(task.id);
    setIsModalOpen(true);
  };

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

    setFadingOutIds((prev) => [...prev, id]);

    setTimeout(() => {
      setHidden(id);
    }, 1500);
  };

  const getTimeRemaining = (dueDate: Date | string) => {
    const now = dayjs();
    const due = dayjs(dueDate);
    const diffInMs = due.diff(now);

    if (diffInMs <= 0) return t("Past due");

    const totalMinutes = Math.floor(diffInMs / 60000);
    const days = Math.floor(totalMinutes / (60 * 24));
    const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
    const minutes = totalMinutes % 60;

    return `${days}d ${hours}h ${minutes}min`;
  };

  return (
    <div className="flex flex-wrap justify-center gap-[35px] flex-1 m-5 mt-5 p-5">
      {isLoading && tasks.length === 0 && (
        <div className="text-gray-800 dark:text-white">{t("fetching data...")}</div>
      )}
      {isError && <div className="text-red-500">{t("error fetching data")}</div>}
      {tasks
        .filter((item) => (isCompletedPage ? item.isHidden : !item.isHidden))
        .map((item) => (
          <div
            key={item.id}
            className={`relative flex flex-col transition-opacity duration-[1500ms] ease-in-out
              w-[320px] min-w-[300px] max-w-[350px] h-[250px] rounded-2xl p-4 pt-2 shadow-md
              bg-white dark:bg-gray-800 text-black dark:text-white
              ${
                item.isCompleted
                  ? "border-[3px] border-green-300"
                  : "border-[3px] border-gray-300 dark:border-gray-600"
              }
              ${fadingOutIds.includes(item.id) ? "opacity-0" : "opacity-100"}
              ${
                fadingOutIds.includes(item.id)
                  ? "pointer-events-none"
                  : "pointer-events-auto"
              }
            `}
          >
            {loadingId === item.id ? (
              <div className="flex-1 flex flex-col justify-center items-center text-gray-500">
                <span className="text-lg font-semibold">{t("Loading...")}</span>
              </div>
            ) : (
              <>
                <button
                  className="absolute top-2 right-[72px] flex items-center justify-center text-white bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500 w-[28px] h-[28px]"
                  onClick={() => handleOpenModal(item)}
                >
                  ✎
                </button>
                <CustomModal
                  title="Edit"
                  isAdd={false}
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                  taskName={taskName}
                  setTaskName={setTaskName}
                  taskDescription={taskDescription}
                  setTaskDescription={setTaskDescription}
                  dueDate={dueDate}
                  setDueDate={setDueDate}
                  taskId={editedTaskId!}
                />
                <button
                  className="absolute top-2 right-10 flex items-center justify-center text-white bg-green-500 px-2 py-1 rounded hover:bg-green-600 w-[28px] h-[28px]"
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
                    {t("timeLeft", {
                      time: getTimeRemaining(
                        typeof item.dueDate === "string"
                          ? new Date(item.dueDate)
                          : item.dueDate.toDate()
                      ),
                    })}
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

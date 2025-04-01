import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import moment, { Moment } from "moment";
import { TaskContext } from "../App";
import CustomModal from "./Modal";
import { TaskProps, TaskViewModel } from "../types/Types";
import { useTranslation } from "react-i18next";
import { defaultAnimateLayoutChanges } from "@dnd-kit/sortable";

const DraggableTask: React.FC<TaskProps> = ({ task }) => {
  // eslint-disable-next-line
  const [_, setCurrentTime] = useState(new Date());
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [dueDate, setDueDate] = useState<Moment | string>(moment());
  const [editedTaskId, setEditedTaskId] = useState<number>();

  const [fadingOutIds, setFadingOutIds] = useState<number[]>([]);

  const { removeTask, setCompleted, setHidden } = useContext(TaskContext)!;
  const { t }: any = useTranslation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleOpenModal = (t: TaskViewModel) => {
    setTaskName(t.name);
    setTaskDescription(t.description);
    setDueDate(t.dueDate);
    setEditedTaskId(t.id);
    setIsModalOpen(true);
  };

  const handleSetCompleted = async (id: number) => {
    setLoadingId(id);
    await setCompleted(id);
    setLoadingId(null);

    setFadingOutIds((prev) => [...prev, id]);

    setTimeout(() => {
      setHidden(id);
    }, 1500);
  };

  const getTimeRemaining = (dueDateVal: Date | string) => {
    const now = dayjs();
    const due = dayjs(dueDateVal);
    const diffInMs = due.diff(now);
    if (diffInMs <= 0) return t("Past due");
    const totalMinutes = Math.floor(diffInMs / 60000);
    const days = Math.floor(totalMinutes / (60 * 24));
    const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
    const minutes = totalMinutes % 60;
    return `${days}d ${hours}h ${minutes}min`;
  };

  const {
    attributes,
    listeners,
    setActivatorNodeRef,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    animateLayoutChanges: defaultAnimateLayoutChanges,
  });

  const dndStyle: React.CSSProperties = {
    transform: transform ? CSS.Transform.toString(transform) : undefined,
    transition,
    touchAction: "manipulation",
    zIndex: isDragging ? 9999 : "auto",
  };

  return (
    <div ref={setNodeRef} style={dndStyle}>
      <div
        className={`relative flex flex-col transition-opacity duration-[1500ms] ease-in-out
          w-[320px] min-w-[300px] max-w-[350px] h-[250px] rounded-2xl p-4 pt-2 shadow-md
          bg-white dark:bg-gray-800 text-black dark:text-white
          ${
            task.isCompleted
              ? "border-[3px] border-green-300"
              : "border-[3px] border-gray-300 dark:border-gray-600"
          }
          ${
            fadingOutIds.includes(task.id)
              ? "opacity-0 pointer-events-none"
              : "opacity-100 pointer-events-auto"
          }`}
      >
        <div
          ref={setActivatorNodeRef}
          {...attributes}
          {...listeners}
          className="absolute left-2 top-2 cursor-grab"
        >
          :::
        </div>

        {loadingId === task.id ? (
          <div className="flex-1 flex flex-col justify-center items-center text-gray-500">
            <span className="text-lg font-semibold">{t("Loading...")}</span>
          </div>
        ) : (
          <>
            <button
              className="absolute top-2 right-[72px] flex items-center justify-center text-white bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500 w-[28px] h-[28px]"
              onClick={() => handleOpenModal(task)}
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
              isCompleted={task.isCompleted!}
            />
            <button
              className="absolute top-2 right-10 flex items-center justify-center text-white bg-green-500 px-2 py-1 rounded hover:bg-green-600 w-[28px] h-[28px]"
              onClick={() => handleSetCompleted(task.id)}
            >
              ✓
            </button>
            <button
              className="absolute top-2 right-2 flex items-center justify-center text-white bg-red-500 px-2 py-1 rounded hover:bg-red-600 w-[28px] h-[28px]"
              onClick={() => removeTask(task.id)}
            >
              ✕
            </button>
            <h3 className="text-xl font-semibold ml-2 mb-2 w-[85%] overflow-hidden">
              {task.name}
            </h3>
            <div className="border-b border-gray-300 dark:border-gray-600 mb-2" />
            <p className="h-[65%]">{task.description}</p>
            <div className="border-b border-gray-300 dark:border-gray-600 mb-2" />
            <div className="h-[15%] content-center">
              <h3>
                {t("timeLeft", {
                  time: getTimeRemaining(
                    typeof task.dueDate === "string"
                      ? new Date(task.dueDate)
                      : task.dueDate.toDate()
                  ),
                })}
              </h3>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DraggableTask;

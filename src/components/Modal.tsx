import moment, { Moment } from "moment";
import { FC, useContext, useState } from "react";
import Modal from "react-modal";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { TaskContext } from "../pages/MainPage";
import { CustomModalProps } from "../types/Types";

const CustomModal: FC<CustomModalProps> = ({
  title,
  isAdd,
  isModalOpen,
  setIsModalOpen,
  taskName,
  setTaskName,
  taskDescription,
  setTaskDescription,
  dueDate,
  setDueDate,
  taskId,
}) => {
  const [borderError, setBorderError] = useState(false);

  const { addTask, editTask } = useContext(TaskContext)!;

  const customStyles = {
    content: {
      height: "80%",
      width: "40%",
      alignSelf: "center",
      justifySelf: "center",
      borderRadius: "16px",
    },
    overlay: {
      backgroundColor: "rgba(107, 103, 103, 0.6)",
    },
  };

  dayjs.extend(utc);
  dayjs.extend(timezone);

  const handleModal = (
    name: string,
    description: string,
    dueDate: string | Moment,
    taskId?: number
  ) => {
    if (name !== "" && description !== "") {
      const formattedDueDate = dayjs((dueDate as Moment).toDate())
        .tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
        .format("YYYY-MM-DDTHH:mm:ss");

      isAdd
        ? addTask(name, description, formattedDueDate)
        : editTask(taskId!, name, description, formattedDueDate);

      setIsModalOpen(false);
      setTaskName("");
      setTaskDescription("");
      setDueDate(moment());
      setBorderError(false);
    } else {
      setBorderError(true);
    }
  };

  return (
    <Modal
      onAfterOpen={() => setDueDate(moment())}
      isOpen={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
      style={customStyles}
    >
      <div className="text-gray-800 dark:text-white">
        <h2 className="text-2xl font-semibold mb-4">{title} Task</h2>
        <p className="text-sm mb-4">
          Enter any data you would like to have displayed in your To Do List.
        </p>

        <div className="relative mb-4">
          {borderError && (
            <div className="absolute right-5 text-red-500 text-sm">
              Error name field null or invalid
            </div>
          )}
          <label className="block mb-1">Name:</label>
          <input
            className={`w-full p-2 border rounded bg-white dark:bg-gray-700 dark:text-white ${
              borderError ? "border-2 border-red-500" : "border-gray-300"
            }`}
            onChange={(e) => setTaskName(e.target.value)}
            value={taskName}
          />
        </div>

        <div className="relative mb-4">
          {borderError && (
            <div className="absolute right-5 text-red-500 text-sm">
              Error dueDate field null or invalid
            </div>
          )}
          <div className="flex flex-row items-center mt-6">
            <label className="block mb-1">Due date:</label>

            <Datetime
              value={dueDate}
              onChange={(val) => setDueDate(val)}
              inputProps={{
                className:
                  "w-36 ml-4 p-2 border rounded bg-white dark:bg-gray-700 dark:text-white",
              }}
              dateFormat="YYYY-MM-DD"
              timeFormat="HH:mm"
            />
          </div>
        </div>

        <div className="relative mb-6">
          {borderError && (
            <div className="absolute right-5 text-red-500 text-sm">
              Error description field null or invalid
            </div>
          )}
          <label className="block mb-1">Description:</label>
          <textarea
            className={`w-full h-24 p-2 border rounded bg-white dark:bg-gray-700 dark:text-white ${
              borderError ? "border-2 border-red-500" : "border-gray-300"
            }`}
            onChange={(e) => setTaskDescription(e.target.value)}
            value={taskDescription}
          />
        </div>
        {isAdd ? (
          <div className="flex justify-end">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => handleModal(taskName, taskDescription, dueDate)}
            >
              Add Task
            </button>
          </div>
        ) : (
          <div className="flex justify-end">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() =>
                handleModal(taskName, taskDescription, dueDate, taskId)
              }
            >
              Edit Task
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CustomModal;

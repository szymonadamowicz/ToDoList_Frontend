import { useContext, useState } from "react";
import { TaskContext } from "../App";
import DarkModeToggle from "./DarkModeToggle";

import moment, { Moment } from "moment";
import CustomModal from "./Modal";
import { useNavigate } from "react-router-dom";
import { TaskViewProps } from "../types/Types";
import LanguageToggle from "./LanguageToggle";
import { useTranslation } from "react-i18next";

const Navbar: React.FC<TaskViewProps> = ({ isCompletedPage }) => {
  const { tasks } = useContext(TaskContext)!;
  const { t }: any = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [dueDate, setDueDate] = useState<Moment | string>(moment());

  const navigate = useNavigate();

  return (
    <div className="h-auto py-3 sm:h-[60px] bg-purple-400 dark:bg-purple-700 w-full flex flex-col sm:flex-row sm:items-center px-4 gap-2 sm:gap-0 sm:px-6 shadow-md">
      <h3 className="text-xl font-bold text-white sm:flex-grow text-center sm:text-left">
        {t("To Do List")}
      </h3>
      <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
        {!isCompletedPage && (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-1 rounded shadow"
            onClick={() => setIsModalOpen(true)}
          >
            +
          </button>
        )}
        <button
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-4 py-1 rounded shadow"
          onClick={() => navigate(isCompletedPage ? "/" : "completed-tasks")}
        >
          {isCompletedPage ? t("to do tasks") : t("completed tasks")}
        </button>
        <button
          className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-4 py-1 rounded shadow"
          onClick={() => console.log(tasks)}
        >
          ?
        </button>
        <LanguageToggle />
        <DarkModeToggle />
      </div>
      <CustomModal
        title="Add"
        isAdd={true}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        taskName={taskName}
        setTaskName={setTaskName}
        taskDescription={taskDescription}
        setTaskDescription={setTaskDescription}
        dueDate={dueDate}
        setDueDate={setDueDate}
      />
    </div>
  );
};

export default Navbar;

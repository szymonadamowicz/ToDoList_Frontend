import { useContext, useState } from "react";
import { TaskContext } from "../pages/MainPage";
import DarkModeToggle from "./DarkModeToggle";

import moment, { Moment } from "moment";
import CustomModal from "./Modal";

const Navbar = () => {
  const { tasks } = useContext(TaskContext)!;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [dueDate, setDueDate] = useState<Moment | string>(moment());

  return (
    <div className="h-[60px] bg-purple-400 dark:bg-purple-700  w-full flex items-center px-6 shadow-md">
      <h3 className="text-xl font-bold text-white flex-grow">To Do List</h3>
      <div className="flex gap-3">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-1 rounded shadow"
          onClick={() => setIsModalOpen(true)}
        >
          +
        </button>
        <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-4 py-1 rounded shadow">
          completed tasks
        </button>
        <button
          className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-4 py-1 rounded shadow"
          onClick={() => console.log(tasks)}
        >
          ?
        </button>
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

import { useContext, useState } from "react";
import Modal from "react-modal";
import { TaskContext } from "../pages/MainPage";
import DarkModeToggle from "./DarkModeToggle";


const Navbar = () => {
  const { addTask } = useContext(TaskContext)!;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [borderError, setBorderError] = useState(false);

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

  const handleModalAdd = (name: string, description: string) => {
    if (name !== "" && description !== "") {
      addTask(name, description);
      setIsModalOpen(false);
      setTaskName("");
      setTaskDescription("");
      setBorderError(false);
    } else {
      setBorderError(true);
    }
  };

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
        <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-4 py-1 rounded shadow">
        edit task
        </button>
        <DarkModeToggle />
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={customStyles}
      >
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl text-gray-800 dark:text-white">
          <h2 className="text-2xl font-semibold mb-4">Add Task</h2>
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

          <div className="flex justify-end">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => handleModalAdd(taskName, taskDescription)}
            >
              Add Task
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Navbar;

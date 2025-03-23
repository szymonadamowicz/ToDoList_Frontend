import { useContext, useState } from "react";
import Modal from "react-modal";
import { TaskContext } from "../pages/MainPage";

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
      console.log("Error adding task");
      setBorderError(true);
    }
  };

  return (
    <div className="h-[40px] bg-green-500 w-full flex flex-row items-center">
      <h3 className="w-[30%] ml-5 text-white font-semibold">To Do List</h3>
      <div className="flex gap-2 justify-end w-full mr-5">
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          style={customStyles}
        >
          <h2 className="text-xl font-bold mb-2">Add task</h2>
          <div className="w-full border-b border-black mb-2" />

          <h4 className="my-2 text-sm">
            Enter any data you would like to have displayed in your To Do List as a single task
          </h4>

          <div className="relative">
            {borderError && (
              <div className="absolute right-5 text-red-500 text-sm">
                Error name field null or invalid
              </div>
            )}
            <div className="mb-1">Name:</div>
            <input
              className={`w-full p-2 border rounded ${
                borderError ? "border-2 border-red-500" : "border-gray-300"
              }`}
              onChange={(e) => setTaskName(e.target.value)}
              value={taskName}
            />
          </div>

          <div className="relative mt-4">
            {borderError && (
              <div className="absolute right-5 text-red-500 text-sm">
                Error desciption field null or invalid
              </div>
            )}
            <div className="mb-1">Description:</div>
            <textarea
              className={`w-full min-h-[100px] p-2 border rounded ${
                borderError ? "border-2 border-red-500" : "border-gray-300"
              }`}
              onChange={(e) => setTaskDescription(e.target.value)}
              value={taskDescription}
            />
          </div>

          <div className="absolute bottom-5 right-5">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => handleModalAdd(taskName, taskDescription)}
            >
              Add task
            </button>
          </div>
        </Modal>

        <button
          className="bg-white text-black px-3 py-1 rounded shadow hover:bg-gray-100"
          onClick={() => setIsModalOpen(true)}
        >
          +
        </button>

        <button className="bg-white text-black px-3 py-1 rounded shadow hover:bg-gray-100">
          completed tasks
        </button>

        <button className="bg-white text-black px-3 py-1 rounded shadow hover:bg-gray-100 mr-5">
          edit task
        </button>
      </div>
    </div>
  );
};

export default Navbar;

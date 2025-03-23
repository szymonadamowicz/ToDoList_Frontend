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
      setBorderError(false)
    } else {
      console.log("Error adding task");
      setBorderError(true);
    }
  };

  return (
    <div
      style={{
        height: "40px",
        backgroundColor: "green",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <h3 style={{ width: "30%", marginLeft: 20 }}>To Do List</h3>
      <div
        style={{
          gap: 10,
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          style={customStyles}
        >
          <h2>Add task</h2>
          <div
            style={{
              width: "100%",
              borderBottom: "1px solid black",
              marginBottom: "10px",
            }}
          />
          <h4 style={{ marginTop: "10px", marginBottom: "10px" }}>
            Enter any data you would like to have displayed in your To Do List
            as a single task
          </h4>
          <div>
            {borderError && (
              <div
                style={{ position: "absolute", right: "20px", color: "red" }}
              >
                Error name field null or invalid
              </div>
            )}

            <div style={{ marginBottom: "4px" }}>Name:</div>
            <input
              style={{
                width: "100%",
                border: borderError ? "2px solid red" : "",
              }}
              onChange={(e) => setTaskName(e.target.value)}
              value={taskName}
            />
          </div>
          <div>
            {borderError && (
              <div
                style={{ position: "absolute", right: "20px", color: "red" }}
              >
                Error desciption field null or invalid
              </div>
            )}
            <div
              style={{
                marginTop: "10px",
                marginBottom: "4px",
              }}
            >
              Description:
            </div>
            <textarea
              style={{
                width: "100%",
                minHeight: "100px",
                border: borderError ? "2px solid red" : ""
              }}
              onChange={(e) => setTaskDescription(e.target.value)}
              value={taskDescription}
            />
          </div>

          <div style={{ position: "absolute", bottom: "20px", right: "20px" }}>
            <button onClick={() => handleModalAdd(taskName, taskDescription)}>
              Add task
            </button>
          </div>
        </Modal>
        <button onClick={() => setIsModalOpen(true)}>+</button>
        <button>completed tasks</button>
        <button style={{ marginRight: 20 }}>edit task</button>
      </div>
    </div>
  );
};

export default Navbar;

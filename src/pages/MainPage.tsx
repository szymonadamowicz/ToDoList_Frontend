import Navbar from "../components/Navbar";
import TaskView from "../components/TaskWiew";

const MainPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        height: "100%",
        backgroundColor: "red",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <TaskView />
    </div>
  );
};

export default MainPage;

import { TaskViewModel } from "../types/Types";

export const fetchTasksApi = async () => {
  try {
    const res = await fetch("https://localhost:7140/tasks");
    if (!res.ok) {
      console.log(`Fetch tasks failed: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("fetchTasksApi error:", error);
  }
};

export const addTaskApi = async (task: TaskViewModel) => {
  try {
    const res = await fetch("https://localhost:7140/tasks/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: task.name,
        description: task.description,
        DueDate: task.dueDate,
        isCompleted: false,
      }),
    });

    if (!res.ok) {
      console.log(`Add task failed: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("addTaskApi error:", error);
  }
};

export const removeTaskApi = async (id: number) => {
  try {
    const res = await fetch(`https://localhost:7140/tasks/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      console.log(`Remove task failed: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("removeTaskApi error:", error);
  }
};

export const swapTasksApi = async (id1: number, id2: number) => {
  try {
    const res = await fetch(
      `https://localhost:7140/tasks/swap?task1Id=${id1}&task2Id=${id2}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!res.ok) {
      console.log(`Swap tasks failed: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("swapTasksApi error:", error);
  }
};

export const setCompletedApi = async (id1: number) => {
  try {
    const res = await fetch(
      `https://localhost:7140/tasks/setCompleted?task1Id=${id1}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!res.ok) {
      console.log(`Set completed failed: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("setCompletedApi error:", error);
  }
};

export const editTaskApi = async (editedTask: TaskViewModel) => {
  try {
    const res = await fetch(
      `https://localhost:7140/tasks/editTask?taskId=${editedTask.id}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editedTask.name,
          description: editedTask.description,
          DueDate: editedTask.dueDate,
          isCompleted: editedTask.isCompleted,
        }),
      }
    );

    if (!res.ok) {
      console.log(`task edit failed: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("addTaskApi error:", error);
  }
};

export const setHiddenApi = async (taskId: number) => {
  try {
    const res = await fetch(
      `https://localhost:7140/tasks/setHidden?taskId=${taskId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!res.ok) {
      console.log(`task set hidden failed: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("addTaskApi error:", error);
  }
};

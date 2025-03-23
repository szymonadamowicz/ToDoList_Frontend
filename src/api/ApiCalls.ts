import { Moment } from "moment";

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

export const addTaskApi = async (name:string, description:string, dueDate:string|Moment) => {
  try {
    const res = await fetch("https://localhost:7140/tasks/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        description: description,
        DueDate: dueDate,
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

export const editTaskApi = async (taskId:number, name:string, description:string, dueDate:string|Moment) => {
  try {
    const res = await fetch(`https://localhost:7140/tasks/editTask?taskId=${taskId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        description: description,
        DueDate: dueDate,
        isCompleted: false,
      }),
    });

    if (!res.ok) {
      console.log(`task edit failed: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("addTaskApi error:", error);
  }
};


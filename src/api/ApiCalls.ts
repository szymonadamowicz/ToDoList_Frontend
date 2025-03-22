export const fetchTasksApi = () => {
  return fetch("https://localhost:7140/tasks");
};

export const addTaskApi = () => {
  return fetch("https://localhost:7140/tasks/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "new",
      description: "desc",
      isCompleted: true,
    }),
  });
};

export const removeTaskApi = (id: number) => {
  return fetch(`https://localhost:7140/tasks/${id}`, {
    method: "DELETE",
  });
};

export const swapTasksApi = (id1: number, id2: number) => {
  return fetch(
    `https://localhost:7140/tasks/swap?task1Id=${id1}&task2Id=${id2}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }
  );
};

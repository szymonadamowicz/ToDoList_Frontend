import { useEffect, useState } from "react";
import {
  fetchTasksApi,
  addTaskApi,
  removeTaskApi,
  swapTasksApi,
  setCompletedApi,
} from "../api/ApiCalls";

export type Task = {
  id: number;
  name: string;
  description: string;
  isCompleted: boolean;
};

export const useTaskService = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetchTasksApi();
      const data = await res.json();
      setTasks(data);
    };

    fetchTasks();
  }, [refresh]);

  const addTask = async (): Promise<string> => {
    const res = await addTaskApi();
    const data = await res.json();
    console.log(data.message);
    setRefresh((prev) => prev + 1);
    return data.message;
  };

  const removeTask = async (id: number): Promise<string> => {
    const res = await removeTaskApi(id);
    const data = await res.json();
    console.log(data.message);
    setRefresh((prev) => prev + 1);
    return data.message;
  };

  const swapTasks = async (id1: number, id2: number): Promise<string> => {
    const res = await swapTasksApi(id1, id2);
    const data = await res.json();
    console.log(data.message);
    setRefresh((prev) => prev + 1);
    return data.message;
  };

  const setCompleted = async (id1: number): Promise<string> => {
    const res = await setCompletedApi(id1);
    const data = await res.json();
    console.log(data.message);
    setRefresh((prev) => prev + 1);
    return data.message;
  };


  return {
    tasks,
    addTask,
    removeTask,
    swapTasks,
    setCompleted
  };
};

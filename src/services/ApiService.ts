import { useState, useEffect } from "react";
import {
  fetchTasksApi,
  addTaskApi,
  removeTaskApi,
  swapTasksApi,
  setCompletedApi,
  editTaskApi,
} from "../api/ApiCalls";
import { Task } from "../types/Types";
import { Moment } from "moment";


export const useTaskService = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [refresh, setRefresh] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const data = await fetchTasksApi();

      if (!data) {
        setIsError(true);
        setIsLoading(false)
        return;
      }

      setTasks(data);
      setIsError(false);
      setIsLoading(false)
    };

    fetchData();
  }, [refresh]);

  const refreshTasks = () => setRefresh((prev) => prev + 1);

  const addTask = async (name:string, description:string, dueDate:string|Moment) => {
    const data = await addTaskApi(name, description, dueDate);
    if (!data) return setIsError(true);
    refreshTasks();
  };

  const removeTask = async (id: number) => {
    const data = await removeTaskApi(id);
    if (!data) return setIsError(true);
    refreshTasks();
  };

  const swapTasks = async (id1: number, id2: number) => {
    const data = await swapTasksApi(id1, id2);
    if (!data) return setIsError(true);
    refreshTasks();
  };

  const setCompleted = async (id: number) => {
    const data = await setCompletedApi(id);
    if (!data) return setIsError(true);
    refreshTasks();
  };

  const editTask = async (id: number, name:string, description:string, dueDate:string|Moment) => {
    console.log(id)
    const data = await editTaskApi(id, name, description, dueDate);
    if (!data) return setIsError(true);
    refreshTasks();
  };

  return {
    tasks,
    addTask,
    removeTask,
    swapTasks,
    setCompleted,
    editTask,
    isError,
    isLoading,
  };
};

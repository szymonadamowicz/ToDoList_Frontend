import { TaskViewModel } from "../types/Types";

export const toTaskViewModel = (task: TaskViewModel): TaskViewModel => ({
  id: task.id,
  name: task.name,
  description: task.description,
  dueDate: task.dueDate,
  isCompleted: task.isCompleted,
  isHidden: task.isHidden
});
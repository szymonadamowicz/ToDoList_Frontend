import { Moment } from "moment";

export type TaskViewModel = {
  id: number;
  name: string;
  description: string;
  dueDate: string | Moment;
  isCompleted?: boolean;
  isHidden?: boolean;
};

export type ThemeModel = {
  isDarkMode: boolean;
  language: boolean;
};

export type CustomModalProps = {
  title: string;
  isAdd: boolean;
  isModalOpen: boolean;
  setIsModalOpen: (bool: boolean) => void;
  taskName: string;
  setTaskName: (taskName: string) => void;
  taskDescription: string;
  setTaskDescription: (taskDescription: string) => void;
  dueDate: Moment | string;
  setDueDate: (dueDate: Moment | string) => void;
  taskId?: number;
  isCompleted?:boolean
};

export type TaskViewProps = {
  isCompletedPage: boolean;
};

export type TaskProps = {
  task: TaskViewModel;
};

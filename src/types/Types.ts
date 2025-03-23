import { Moment } from "moment";

export type Task = {
    id: number;
    name: string;
    description: string;
    dueDate: string | Moment
    isCompleted: boolean;
  };
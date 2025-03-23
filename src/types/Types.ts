import { Moment } from "moment";

export type Task = {
    id: number;
    name: string;
    description: string;
    dueDateInput: string | Moment
    isCompleted: boolean;
  };
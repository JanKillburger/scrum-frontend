export interface NewTask {
  title: string;
  description: string;
  due_date: string;
  status: string;
  created_by: User;
  assigned_to: User;
  subtasks: SubTask[];
}

export interface Task extends NewTask {
  id: number;
}

export interface NewSubTask {
  title: string;
  completed: boolean;
}

export interface SubTask extends NewSubTask {
  id: number;
}

export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
}
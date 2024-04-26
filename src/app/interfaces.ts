export interface NewTask {
  title: string;
  description: string;
  due_date: string;
  status: string;
  created_by: number;
  assigned_to: number;
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
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewSubTask, NewTask, SubTask, Task, User, isTask } from './interfaces';
import { environment } from '../environments/environment.development';

export interface taskJsonData {
  title: string;
  description: string;
  due_date: string;
  status: string;
  assigned_to: number;
  subtasks?: (SubTask | NewSubTask)[];
  id?: number;
}

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  taskConverter = {
    toJson: (task: Task | NewTask) => {
      let jsonData:taskJsonData = {
      title: task.title,
      description: task.description,
      due_date: task.due_date,
      status: task.status,
      assigned_to: task.assigned_to.id
      };
      if (isTask(task)) {
        jsonData.id = task.id
      }
      if (task.subtasks?.length > 1) {
        jsonData.subtasks = task.subtasks
      }
    }
  }



  constructor(private http: HttpClient) { this.getTasks() }


  getTasks() {
    return this.http.get<Task[]>(environment.apiUrl + 'tasks/')
  }

  deleteTask(id: number) {
    return this.http.delete(environment.apiUrl + `tasks/${id}/`)
  }

  getUsers() {
    return this.http.get<User[]>(environment.apiUrl + 'users/')
  }

  createTask(task: taskJsonData) {
    return this.http.post<Task>(environment.apiUrl + 'tasks/', task)
  }

  updateTask(task: taskJsonData) {
    return this.http.put<Task>(environment.apiUrl + `tasks/${task.id}/`, task)
  }
}

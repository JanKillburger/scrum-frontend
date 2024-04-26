import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task, User } from './interfaces';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { this.getTasks() }

  getTasks() {
    return this.http.get<Task[]>(environment.apiUrl + 'tasks/')
  }

  deleteTask(id: number) {
    return this.http.delete(environment.apiUrl + `tasks/${id}`)
  }

  getUsers() {
    return this.http.get<User[]>(environment.apiUrl + 'users/')
  }
}

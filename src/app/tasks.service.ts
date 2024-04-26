import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from './interfaces';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { this.getTasks() }

  getTasks() {
    return this.http.get<Task[]>(environment.apiUrl + 'tasks/')
  }
}

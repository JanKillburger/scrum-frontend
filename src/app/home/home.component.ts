import { Component, OnInit } from '@angular/core';
import { Task } from '../interfaces';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  tasks: Task[] = [];

  ngOnInit() {
    this.tasks = [
      {
        title: "Task 1",
        description: "desc",
        id: 1,
        due_date: "2024-04-21",
        status: "open",
        created_by: 1,
        assigned_to: 1,
        subtasks: []
      },
      {
        title: "Task 2",
        description: "desc",
        id: 1,
        due_date: "2024-04-28",
        status: "completed",
        created_by: 2,
        assigned_to: 2,
        subtasks: []
      }
    ]
  }
}

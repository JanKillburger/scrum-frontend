import { Component, OnInit } from '@angular/core';
import { Task } from '../interfaces';
import { DatePipe } from '@angular/common';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private tasksService: TasksService) { }

  tasks: Task[] = [];

  ngOnInit() {
    this.tasksService.getTasks()
      .subscribe(data => this.tasks = data)
  }
}

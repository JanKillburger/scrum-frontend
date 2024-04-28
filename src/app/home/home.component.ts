import { Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { Task } from '../interfaces';
import { DatePipe } from '@angular/common';
import { TasksService } from '../tasks.service';
import { TaskFormComponent, TaskResponse } from '../task-form/task-form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DatePipe, TaskFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  @ViewChild('taskdialog') taskdialog!: ElementRef
  constructor(public tasksService: TasksService) { }

  tasks: Task[] = [];
  selectedTaskId = 0;

  ngOnInit() {
    this.tasksService.getTasks()
      .subscribe(data => this.tasks = data)
  }

  deleteTask(id: number) {
    this.tasksService.deleteTask(id)
      .subscribe(
        () => this.tasks = this.tasks.filter(t => t.id !== id)
      )
  }

  showTaskInDialog(id: number) {
    this.selectedTaskId = id;
    this.taskdialog.nativeElement.showModal();
  }

  getSelectedTask() {
    return this.tasks.find(t => t.id === this.selectedTaskId) ?? null
  }

  updateListFromFormSubmission(resp: TaskResponse) {
    if (resp.action === "updatedTask") {
      this.tasks = this.tasks.map(t => t.id === resp.task.id ? resp.task : t)
    } else if (resp.action === "createdTask") {
      this.tasks.push(resp.task)
    }
    this.taskdialog.nativeElement.close()
  }
}

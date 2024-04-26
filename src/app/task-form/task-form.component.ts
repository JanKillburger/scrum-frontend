import { JsonPipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../shared/input/input.component';
import { SelectComponent } from '../shared/select/select.component';
import { TasksService } from '../tasks.service';
import { Task } from '../interfaces';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [JsonPipe, ReactiveFormsModule, InputComponent, SelectComponent],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit, OnChanges {
  @Input() selectedId = 0;
  @Input() tasks: Task[] = []
  constructor(private tasksService: TasksService) { this.setUserOptions() }

  userOptions: { id: number, value: string }[] = []
  taskForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]),
    description: new FormControl(''),
    status: new FormControl('Pick one'),
    due_date: new FormControl(''),
    assigned_to: new FormControl(),
  })

  ngOnInit(): void {
    this.setForm(this.selectedId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedId) {
      this.setForm(changes.selectedId.currentValue)
    }
  }

  setForm(id: number) {
    const task = this.tasks.find(t => t.id === id)
    if (task) {
      console.log(task)
      this.taskForm.controls.title.setValue(task.title)
      this.taskForm.controls.description.setValue(task.description)
      this.taskForm.controls.status.setValue(task.status)
      this.taskForm.controls.assigned_to.setValue(task.assigned_to.id ?? 0)
      this.taskForm.controls.due_date.setValue(task.due_date)
    }
  }

  setUserOptions() {
    this.tasksService.getUsers()
      .subscribe(data => {
        data.forEach(user => this.userOptions.push({ id: user.id, value: user.username }))
      })

  }
}

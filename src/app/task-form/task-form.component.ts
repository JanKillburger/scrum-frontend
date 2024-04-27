import { JsonPipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
export class TaskFormComponent implements OnChanges {
  @Input() task: Task | null = null

  userOptions: { id: number, value: string }[] = []
  taskForm = this.formBuilder.group({
    title: ['',[Validators.required, Validators.minLength(5)]],
    description: [''],
    status: ['0'],
    dueDate: [''],
    assignedTo: [0],
  })

  constructor(private tasksService: TasksService, private formBuilder: FormBuilder) { this.setUserOptions() }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.task) {
      this.setForm()
    }
  }

  setForm() {
    if (this.task === null) {
      this.taskForm.reset({
        title: '',
        description: '',
        status: '0',
        dueDate: '',
        assignedTo: 0,
      });
    } else {
      this.taskForm.reset({
        title: this.task.title,
        description: this.task.description,
        status: this.task.status,
        assignedTo: this.task.assigned_to.id,
        dueDate: this.task.due_date
      })
    }
  }

  setUserOptions() {
    this.tasksService.getUsers()
      .subscribe(data => {
        data.forEach(user => this.userOptions.push({ id: user.id, value: user.username }))
      })

  }
}

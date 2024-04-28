import { JsonPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../shared/input/input.component';
import { SelectComponent } from '../shared/select/select.component';
import { TasksService, taskJsonData } from '../tasks.service';
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
  @Output() onFormSubmitResponse = new EventEmitter<TaskResponse>()

  userOptions: { id: number, value: string }[] = []
  taskForm = this.formBuilder.group({
    id: [0],
    title: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', [Validators.required]],
    status: ['0'],
    due_date: ['', [Validators.required]],
    assigned_to: [0, [Validators.pattern(/[^0]+/)]],
    subtasks: this.formBuilder.array([])
  })

  get subtasks() {
    return this.taskForm.get('subtasks') as FormArray;
  }

  constructor(private tasksService: TasksService, private formBuilder: FormBuilder) { this.setUserOptions() }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.task) this.setForm()
  }

  setForm() {
    this.subtasks.clear()
    if (this.task === null) {
      this.taskForm.reset({
        id: null,
        title: '',
        description: '',
        status: 'open',
        due_date: '',
        assigned_to: 0,
      });
    } else {
      this.taskForm.reset({
        id: this.task.id,
        title: this.task.title,
        description: this.task.description,
        status: this.task.status,
        assigned_to: this.task.assigned_to.id,
        due_date: this.task.due_date
      })
      this.task.subtasks.forEach(st => this.subtasks.push(this.formBuilder.group({ id: [st.id], title: [st.title], completed: [st.completed] })))
    }
  }

  addSubtask() {
    this.subtasks.push(this.formBuilder.group({ title: [''], completed: [false] }));
  }

  removeSubtask(index: number) {
    this.subtasks.removeAt(index);
  }

  setUserOptions() {
    this.tasksService.getUsers()
      .subscribe(data => {
        data.forEach(user => this.userOptions.push({ id: user.id, value: user.username }))
      })
  }

  saveTask() {
    if (this.task?.id) {
    this.tasksService.updateTask(this.taskForm.value as taskJsonData)
      .subscribe(
        data => {
          this.onFormSubmitResponse.emit({task: data, action: "updatedTask"})}
      )
    } else {
      this.tasksService.createTask(this.taskForm.value as taskJsonData)
      .subscribe(
        data => this.onFormSubmitResponse.emit({task: data, action: "createdTask"})
      )
    }
  }
}

export interface TaskResponse {
  task: Task;
  action: "createdTask" | "updatedTask";
}

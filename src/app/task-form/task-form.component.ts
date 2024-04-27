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
  @Input() selectedId: number | null = null;
  @Input() tasks: Task[] = []
  @Input() task: Task | null = null
  constructor(private tasksService: TasksService, private formBuilder: FormBuilder) { this.setUserOptions() }

  userOptions: { id: number, value: string }[] = []
  // taskForm = new FormGroup({
  //   title: new FormControl('', [
  //     Validators.required,
  //     Validators.minLength(5)
  //   ]),
  //   description: new FormControl(''),
  //   status: new FormControl('Pick one'),
  //   due_date: new FormControl(''),
  //   assigned_to: new FormControl(),
  // })

  taskForm = this.formBuilder.group({
    title: ['',[Validators.required, Validators.minLength(5)]],
    description: [''],
    status: ['0'],
    dueDate: [''],
    assignedTo: [0],
  })

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedId) {
      this.setForm(changes.selectedId.currentValue)
    }
  }

  setForm(id: number) {
    const task = this.tasks.find(t => t.id === id)
    if (task === undefined) {
      this.taskForm.reset({
        title: '',
        description: '',
        status: '0',
        dueDate: '',
        assignedTo: 0,
      });
    } else {
      this.taskForm.reset({
        title: task.title,
        description: task.description,
        status: task.status,
        assignedTo: task.assigned_to.id,
        dueDate: task.due_date
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

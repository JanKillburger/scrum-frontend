import { Component, Input } from '@angular/core';
import { SelectOption } from '../../interfaces';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css'
})
export class SelectComponent {
  @Input() label = ''
  @Input() options: SelectOption[] = []
  @Input() control = new FormControl()
}

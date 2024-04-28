import { JsonPipe, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, NgIf, JsonPipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
registerErrorMessage = ''
username = ''
password = ''
confirmpassword = ''

constructor(private http: HttpClient, private router: Router) {}

register() {
  const data = {
    username: this.username,
    password: this.password
  }
  this.http.post(environment.apiUrl + 'register/', data)
    .subscribe({
      next: () => this.router.navigateByUrl('login'),
      error: (err) => this.registerErrorMessage = err
    })
}
}

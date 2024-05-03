import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf, JsonPipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerErrorMessage = ''
  usernameErrors = []
  passwordErrors = []
  username = ''
  password = ''
  confirmpassword = ''

  constructor(private http: HttpClient, private router: Router, private auth: AuthServiceService) { }

  register() {
    this.registerErrorMessage = '';
    this.usernameErrors = [];
    this.passwordErrors = [];
    const data = {
      username: this.username,
      password: this.password
    }
    this.auth.registerUser(data)
      .subscribe(
        {
          next: () => this.router.navigateByUrl('home'),
          error: (err) => {
            for (const key in err.error) {
              if (key === "username") this.usernameErrors = err.error[key]
              else if (key === "password") this.passwordErrors = err.error[key]
              else this.registerErrorMessage += err.error[key]
            }
          }
        }
      )
  }
}

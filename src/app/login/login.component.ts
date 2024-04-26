import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private auth: AuthServiceService, private router: Router) { }
  loginErrorMessage = '';
  username = '';
  password = '';

  login() {
    this.loginErrorMessage = '';
    this.auth.loginWithUsernameAndPassword(this.username, this.password)
      .subscribe(
        {
          next: () => this.router.navigateByUrl('home'),
          error: error => this.loginErrorMessage = error.status === 400 ? 'Invalid username and/or password.' : `Sorry, something went wrong. Please try again later.`
        })
  }
}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
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

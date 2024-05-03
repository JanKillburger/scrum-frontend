import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { catchError, map, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }
  loginWithUsernameAndPassword(username: string, password: string) {
    const url = environment.apiUrl + 'login/';
    const body = {
      "username": username,
      "password": password
    };
    return this.http.post<LoginResponse>(url, body)
      .pipe(
        map(result => localStorage.setItem("token", result.token))
      )
  }

  registerUser(data: { username: string, password: string }) {
    return this.http.post<RegisterResponse>(environment.apiUrl + 'register/', data)
      .pipe(
        map(res => {
          localStorage.setItem("token", res.token);
          localStorage.setItem("username", res.username);
        })
      )
  }

  getAuthToken() {
    return localStorage.getItem('token');
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}

interface RegisterResponse {
  username: string;
  token: string;
}

interface LoginResponse {
  token: string
}


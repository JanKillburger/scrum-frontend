import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private auth: AuthServiceService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.getAuthToken();
    if (token) {
      req = req.clone({
        setHeaders: { Authorization: `Token  ${token}` }
      })
    }
    return next.handle(req).pipe(
      catchError((err) => {
        if (err.status === 401) {
          this.router.navigateByUrl('login');
        }
        return throwError(() => err)
      })
    )

  }
}

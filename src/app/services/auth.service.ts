import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5057/api/auth/login';
  constructor(private http: HttpClient) {}


  login(username: string, password: string): Observable<any> {
    return this.http
      .post<{ token: string }>(this.apiUrl, { username, password })
      .pipe(
        tap((response) => {
          localStorage.setItem('token', response.token);
        }),
        catchError((error) => {
          console.error('Error en el login:', error);
          return throwError(() => error);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}

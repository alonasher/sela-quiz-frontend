import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url = 'http://localhost:3001';
  constructor(private http: HttpClient) {}

  login(userData: any) {
    return this.http.post(`${this.url}/login`, userData).pipe(
      catchError((err) => {
        return throwError(() => new Error('Error Occurd cant log in'));
      })
    );
  }
}

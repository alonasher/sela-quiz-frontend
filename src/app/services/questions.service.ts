import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  url = ' http://localhost:3000/questions';
  constructor(private http: HttpClient) {}

  getQuestions() {
    return this.http.get(this.url).pipe(
      catchError((err) => {
        console.log(err);
        return throwError(
          () => new Error('Error Occurd while getting questions')
        );
      })
    );
  }

  getQuestion(id: number) {
    return this.http.get(`${this.url}/${id}`).pipe(
      catchError((err) => {
        console.log(err);
        return throwError(
          () => new Error('Error Occurd while getting a question')
        );
      })
    );
  }

  deleteQuestion(id: number) {
    return this.http.delete(`${this.url}/${id}`).pipe(
      catchError((err) => {
        console.log(err);
        return throwError(() => new Error('Error Occurd while deleting'));
      })
    );
  }

  addQuestion(question: Question) {
    question.createdAt = new Date();
    return this.http.post(this.url, question);
  }
}

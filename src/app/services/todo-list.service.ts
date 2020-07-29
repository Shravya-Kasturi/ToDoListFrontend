import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Todo } from '../models/todo.model';


@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  private apiUrl = environment.apiUrl + '/todos';

  constructor(private http: HttpClient) { }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      alert(error.error)
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getAllTodos(): Observable<any> {
    return this.http.get<any>(this.apiUrl)
      .pipe(
        tap(_ => { }),
        catchError(this.handleError('getAllTodos', []))
      );
  }

  getSingleTodo(todoId: string): Observable<any> {
    const url = `${this.apiUrl}/${todoId}`;
    return this.http.get<any>(this.apiUrl)
      .pipe(
        tap(_ => { }),
        catchError(this.handleError('getAllTodos', []))
      );
  }

  addSingleTodo(todo: Todo): Observable<any> {
    return this.http.post<any>(this.apiUrl, todo)
      .pipe(
        tap(_ => { }),
        catchError(this.handleError('addSingleTodos', []))
      );
  }

  updateSingleTodo(todo: Todo, todoId: String): Observable<any> {
    const url = `${this.apiUrl}/${todoId}`;
    return this.http.put<any>(url, todo)
      .pipe(
        tap(_ => { }),
        catchError(this.handleError('addSingleTodos', []))
      );
  }

  deleteSingleTodo(todoId: String): Observable<any> {
    const url = `${this.apiUrl}/${todoId}`;
    return this.http.delete<any>(url)
      .pipe(
        tap(_ => { }),
        catchError(this.handleError('addSingleTodos', []))
      );
  }

  
}
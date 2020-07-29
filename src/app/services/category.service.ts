import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Category } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = environment.apiUrl + '/category';
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

  getAllCategories(): Observable<any> {
    return this.http.get<any>(this.apiUrl)
      .pipe(
        tap(_ => { }),
        catchError(this.handleError('getAllCategories', []))
      );
  }

  getSingleCategory(categoryId: string): Observable<any> {
    const url = `${this.apiUrl}/${categoryId}`;
    return this.http.get<any>(url)
      .pipe(
        tap(_ => { }),
        catchError(this.handleError('getAllCategories', []))
      );
  }

  addSingleCategory(category: Category): Observable<any> {
    return this.http.post<any>(this.apiUrl, category)
      .pipe(
        tap(_ => { }),
        catchError(this.handleError('addSingleCategories', []))
      );
  }

  updateSingleCategory(category: Category,categoryId: String): Observable<any> {
    const url = `${this.apiUrl}/${categoryId}`;
    return this.http.put<any>(url,category)
    .pipe(
      tap(_ => { }),
      catchError(this.handleError('addSingleCategories', []))
    );
  }

  deleteSingleCategory(categoryId: String): Observable<any> {
    const url = `${this.apiUrl}/${categoryId}`;
    return this.http.delete<any>(url)
    .pipe(
      tap(_ => { }),
      catchError(this.handleError('addSingleCategories', []))
    );
  }
}

import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { TodoListService } from '../services/todo-list.service';
import { TODO_ACTION_TYPES, loadTodosSuccess, loadTodosFailure, addTodoSuccess, updateTodoSuccess, deleteTodoSuccess} from '../actions/todo.actions'
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable()
export class TodoEffects {

  @Effect()
  loadTodos$ = this.actions$
    .pipe(
      ofType(TODO_ACTION_TYPES.LoadTodos),
      mergeMap((action) => this.todoListService.getAllTodos()
        .pipe(
          map((todos) => {
            return (loadTodosSuccess({ todos: todos}));
          }),
          catchError((errorMessage) => of())
        ))
    );


  @Effect()
  addTodo$ = this.actions$
    .pipe(
      ofType(TODO_ACTION_TYPES.AddTodo),
      mergeMap((action:any) => this.todoListService.addSingleTodo(action.todo)
        .pipe(
          map((todo) => {
            return (addTodoSuccess({ todo: todo}));
          }),
          catchError((errorMessage) => tap(_ => console.log("ERROR",errorMessage) ))
        ))
    );

    @Effect()
  updateTodo$ = this.actions$
    .pipe(
      ofType(TODO_ACTION_TYPES.UpdateTodo),
      mergeMap((action:any) => this.todoListService.updateSingleTodo(action.todo, action.todo.id)
        .pipe(
          map((todo) => {
            todo.id = action.todo.id
            return (updateTodoSuccess({ todo: todo}));
          }),
          catchError((errorMessage) => of())
        ))
    );

    @Effect()
  deleteTodo$ = this.actions$
    .pipe(
      ofType(TODO_ACTION_TYPES.DeleteTodo),
      mergeMap((action:any) => this.todoListService.deleteSingleTodo(action.todoId)
        .pipe(
          map(() => {
            return (deleteTodoSuccess({ todoId: action.todoId}));
          }),
          catchError((errorMessage) => of())
        ))
    );

  constructor(private actions$: Actions, private todoListService: TodoListService) {}

}

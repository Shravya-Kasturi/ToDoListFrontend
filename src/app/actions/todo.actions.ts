import { createAction, props } from '@ngrx/store';
import { Todo } from '../models';

export enum TODO_ACTION_TYPES {
  LoadTodos = '[Todo] Load Todos',
  LoadTodosSuccess = '[Todo] Load Todos Success',
  LoadTodosFailure = '[Todo] Load Todos Failure',
  AddTodo = '[Todo] Add Todo',
  AddTodoSuccess = '[Todo] Add Todo Success',
  AddTodoFailure = '[Todo] Add Todo Failure',
  UpdateTodo = '[Todo] Update Todo',
  UpdateTodoSuccess = '[Todo] Update Todo Success',
  UpdateTodoFailure = '[Todo] Update Todo Failure',
  DeleteTodo = '[Todo] Delete Todo',
  DeleteTodoSuccess = '[Todo] Delete Todo Success',
  DeleteTodoFailure = '[Todo] Delete Todo Failure',
}
export const loadTodos = createAction(
  TODO_ACTION_TYPES.LoadTodos
);

export const loadTodosSuccess = createAction(
  TODO_ACTION_TYPES.LoadTodosSuccess,
  props<{ todos: any }>()
);

export const loadTodosFailure = createAction(
  TODO_ACTION_TYPES.LoadTodosFailure,
  props<{ error: any }>()
);

export const addTodo = createAction(
  TODO_ACTION_TYPES.AddTodo,
  props<{ todo: Todo }>()
);

export const addTodoSuccess = createAction(
  TODO_ACTION_TYPES.AddTodoSuccess,
  props<{ todo: Todo }>()
)

export const addTodoFailure = createAction(
  TODO_ACTION_TYPES.AddTodoFailure,
  props<{ error: any }>()
)

export const updateTodo = createAction(
  TODO_ACTION_TYPES.UpdateTodo,
  props<{ todo: Todo }>()
);

export const updateTodoSuccess = createAction(
  TODO_ACTION_TYPES.UpdateTodoSuccess,
  props<{ todo: Todo }>()
)

export const updateTodoFailure = createAction(
  TODO_ACTION_TYPES.UpdateTodoFailure,
  props<{ error: any }>()
)

export const deleteTodo = createAction(
  TODO_ACTION_TYPES.DeleteTodo,
  props<{ todoId: String }>()
);

export const deleteTodoSuccess = createAction(
  TODO_ACTION_TYPES.DeleteTodoSuccess,
  props<{ todoId: String }>()
)

export const deleteTodoFailure = createAction(
  TODO_ACTION_TYPES.DeleteTodoFailure,
  props<{ error: any }>()
)
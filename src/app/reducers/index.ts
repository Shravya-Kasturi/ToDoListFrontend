import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { TODO_ACTION_TYPES } from '../actions/todo.actions'
import { Todo, Category } from '../models'
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import { CATEGORY_ACTION_TYPES } from '../actions/category.actions';


export interface TodosState extends EntityState<Todo> {

}

export const todoAdapter: EntityAdapter<Todo> =
  createEntityAdapter<Todo>({
  });

export const initialTodosState: TodosState =
  todoAdapter.getInitialState();



export function todoReducer(state: TodosState = initialTodosState, action): TodosState {
  switch (action.type) {

    case TODO_ACTION_TYPES.LoadTodosSuccess:
      return todoAdapter.addAll(action.todos, state);

    case TODO_ACTION_TYPES.AddTodoSuccess:
      return todoAdapter.addOne(action.todo, state)

    case TODO_ACTION_TYPES.UpdateTodoSuccess:
      return todoAdapter.updateOne({ id: action.todo.id, changes: action.todo }, state);

    case TODO_ACTION_TYPES.DeleteTodoSuccess:
      return todoAdapter.removeOne(action.todoId, state)
      
    default:
      return { ...state };
  }
}


export interface CategoriesState extends EntityState<Category> {

}

export const categoryAdapter: EntityAdapter<Category> =
  createEntityAdapter<Category>({
  });

export const initialCategoriesState: CategoriesState =
  categoryAdapter.getInitialState();


export function categoryReducer(state: CategoriesState = initialCategoriesState, action): CategoriesState {
  switch (action.type) {

    case CATEGORY_ACTION_TYPES.LoadCategoriesSuccess:
      return categoryAdapter.addAll(action.categories, state);

    case CATEGORY_ACTION_TYPES.AddCategorySuccess:
      return categoryAdapter.addOne(action.category, state);

    case CATEGORY_ACTION_TYPES.UpdateCategorySuccess:
      return categoryAdapter.updateOne({ id: action.category.id, changes: action.category }, state);

    case CATEGORY_ACTION_TYPES.DeleteCategorySuccess:
      return categoryAdapter.removeOne(action.categoryId, state)

    default:
      return { ...state };
  }
}

export interface State {
  todos: TodosState,
  categories: CategoriesState
}

export const reducers: ActionReducerMap<State> = {
  todos: todoReducer,
  categories: categoryReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

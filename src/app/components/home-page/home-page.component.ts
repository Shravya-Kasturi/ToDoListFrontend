import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { loadTodos, deleteTodo, updateTodo } from 'src/app/actions/todo.actions';
import { Router } from '@angular/router';
import { loadCategories } from 'src/app/actions/category.actions';
import { TASK_STATUS } from 'src/app/models';
import * as _ from 'lodash';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {


  constructor(private store: Store<State>,
    private router: Router) { }
  todos$ = this.store.select(state => state.todos)
  ngOnInit() {
    this.getTodos()
    this.getCategories()
  }

  getTodos() {
    this.store.dispatch(loadTodos())
  }

  getCategories() {
    this.store.dispatch(loadCategories())
  }

  openCreateTodoPage() {
    this.router.navigate(['/task']);
  }

  openCreateCategoryPage() {
    this.router.navigate(['/category'])
  }

  deleteTodo(todoId) {
    this.store.dispatch(deleteTodo({ todoId: todoId }))
  }

  editTodo(todoId) {
    this.router.navigate(['/task'], { queryParams: { todoId: todoId } })
  }

  displayTodoStatus(status) {
    switch (status) {
      case TASK_STATUS.PENDING: return 'pending';
      case TASK_STATUS.COMPLETED: return 'done';
      case TASK_STATUS.OVERDUE: return 'overdue';
      case TASK_STATUS.ARCHIVED: return 'archived';
      default: return 'pending'
    }

  }

  taskStatusChanged(event, todo, taskIndex) {
    let tempTodo = _.cloneDeep(todo)
    if(event.checked)
    tempTodo.tasks[taskIndex].status = TASK_STATUS.COMPLETED
    else
    tempTodo.tasks[taskIndex].status = TASK_STATUS.PENDING
    tempTodo.category = todo.category.id
    this.store.dispatch(updateTodo({todo:tempTodo}))
  }   
}

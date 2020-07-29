import { Component, OnInit } from '@angular/core';
import { Todo, TASK_STATUS, Task } from 'src/app/models';
import { Store } from '@ngrx/store';
import { NgForOf } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { addTodo, updateTodo } from 'src/app/actions/todo.actions';
import { State } from 'src/app/reducers';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  newTodo: Todo = {
    name: '',
    description: '',
    tasks: [],
    dueDate: '',
    completionDate: null,
    status: '',
    category: null
  }

  tasks = []
  statusOptions = [
    { label: "PENDING", value: "PENDING" },
    { label: "OVERDUE", value: "OVERDUE" },
    { label: "ARCHIVED", value: "ARCHIVED" },
    { label: "COMPLETED", value: "COMPLETED" }
  ]

  categoryOptions = []
  maxDate = null
  form: NgForm
  constructor(private store: Store<State>, private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit() {
    if (this.route.snapshot.queryParams.todoId) {
      this.getTodoSelected(this.route.snapshot.queryParams.todoId)
    }
    this.getCategoryOptions()
  }

  getCategoryOptions() {
    this.store.select((state) => state.categories.entities).subscribe((categoryArr) => {
      Object.keys(categoryArr).forEach((key) => {
        this.categoryOptions.push({
          label: categoryArr[key].name,
          value: key
        })
      });
    })
  }

  getTodoSelected(todoId) {
    this.store.select(state => state.todos.entities).subscribe((todoDict) => {
      this.newTodo = { ...todoDict[todoId] }
      delete this.newTodo.tasks
      this.newTodo.tasks = []
      if (this.newTodo.category) {
        this.newTodo.category = todoDict[todoId].category['id']
      }
      this.newTodo.dueDate = moment(this.newTodo.dueDate).format('YYYY-MM-DD')
      if(this.newTodo.completionDate){
        this.newTodo.completionDate = moment(this.newTodo.completionDate).format('YYYY-MM-DD')
      }
      todoDict[todoId].tasks.forEach((task, index) => {
        let tempTask = { ...task }
        tempTask.dueDate = moment(task.dueDate).format('YYYY-MM-DD')
        this.newTodo.tasks.push(tempTask)
      })
    })
  }


  addNewTask() {
    let tempTask: Task = {
      name: '',
      description: '',
      status: 'PENDING',
      dueDate: null,
    }
    this.newTodo.tasks.push(tempTask)
  }

  removeTask(index) {
    this.newTodo.tasks.splice(index, 1)
  }


  saveTodo(form) {
    this.form = form
    if (!this.form.valid) {
      console.log("form not valid")
    }
    if (!this.newTodo.completionDate && this.newTodo.status === TASK_STATUS.COMPLETED) {
      this.newTodo.completionDate = moment().format('YYYY-MM-DD')
    }
    if (this.newTodo.id) {
      this.store.dispatch(updateTodo({ todo: this.newTodo }))
    }
    else {
      this.store.dispatch(addTodo({ todo: this.newTodo }))
    }
    this.goToHomePage()
  }

  goToHomePage() {
    this.router.navigate([''])
  }

  getDateString(date: Date): string {
    //Strip the timezone letter 'Z' from the string;

    return date.toISOString().replace('Z', '');
  }
  setDateString(value: string, variable) {
    variable = new Date(value);
  }

  setMaxDueDate(subTaskIndex) {
    if(!this.newTodo.dueDate){
      this.newTodo.dueDate = this.newTodo.tasks[subTaskIndex].dueDate
    }
    else{
      if(moment(this.newTodo.dueDate,'YYYY-MM-DD').isBefore(moment(this.newTodo.tasks[subTaskIndex].dueDate,'YYYY-MM-DD'))){
        this.newTodo.dueDate = this.newTodo.tasks[subTaskIndex].dueDate
      }
    }
  }


}

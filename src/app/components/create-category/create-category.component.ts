import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { loadCategories, addCategory, deleteCategory, updateCategory } from 'src/app/actions/category.actions';
import { Category } from 'src/app/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  constructor(private store: Store<State>, private router: Router) { }
  categories$ = this.store.select(state=> state.categories)
  categoryIds$ = this.store.select(state=> state.categories.ids)
  newCategory: Category = {
    name:'',
    description: ''
  }
  ngOnInit() {
    this.getCategories()
  }

  getCategories(){
    this.store.dispatch(loadCategories())
  }

  categoryCardClicked(category){
    this.newCategory = {...category}
  }
  
  saveNewCategory(){
    if(this.newCategory.id){
      this.store.dispatch(updateCategory({category:this.newCategory, categoryId: this.newCategory.id}))
    }
    else{
    this.store.dispatch(addCategory({category:this.newCategory}))
    }
    this.newCategory =  {
      name:'',
      description: ''
    }
  }

  deleteCategory(categoryId){
    this.store.dispatch(deleteCategory({categoryId: categoryId}))
  }


  goToHomePage(){
    this.router.navigate([''])
  }
}

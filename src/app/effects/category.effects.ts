import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { CATEGORY_ACTION_TYPES, loadCategories, loadCategoriesSuccess, addCategory, addCategorySuccess, updateCategorySuccess, deleteCategorySuccess} from '../actions/category.actions'
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CategoryService } from '../services/category.service';


@Injectable()
export class CategoryEffects {

  @Effect()
  loadCategories$ = this.actions$
    .pipe(
      ofType(CATEGORY_ACTION_TYPES.LoadCategories),
      mergeMap((action) => this.categoryService.getAllCategories()
        .pipe(
          map((categories) => {
            return (loadCategoriesSuccess({ categories: categories}));
          }),
          catchError((errorMessage) => of())
        ))
    );


  @Effect()
  addCategory$ = this.actions$
    .pipe(
      ofType(CATEGORY_ACTION_TYPES.AddCategory),
      mergeMap((action:any) => this.categoryService.addSingleCategory(action.category)
        .pipe(
          map((category) => {
            return (addCategorySuccess({ category: category}));
          }),
          catchError((errorMessage) => of())
        ))
    );

    @Effect()
  updateCategory$ = this.actions$
    .pipe(
      ofType(CATEGORY_ACTION_TYPES.UpdateCategory),
      mergeMap((action:any) => this.categoryService.updateSingleCategory(action.category, action.categoryId)
        .pipe(
          map((category) => {
            category.id = action.categoryId
            return (updateCategorySuccess({ category: category}));
          }),
          catchError((errorMessage) => of())
        ))
    );

    @Effect()
  deleteCategory$ = this.actions$
    .pipe(
      ofType(CATEGORY_ACTION_TYPES.DeleteCategory),
      mergeMap((action:any) => this.categoryService.deleteSingleCategory(action.categoryId)
        .pipe(
          map(() => {
            return (deleteCategorySuccess({ categoryId: action.categoryId}));
          }),
          catchError((errorMessage) => of())
        ))
    );

  constructor(private actions$: Actions, private categoryService: CategoryService) {}

}

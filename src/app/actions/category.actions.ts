import { createAction, props } from '@ngrx/store';
import { Category } from '../models';
import { Update} from '@ngrx/entity';

export enum CATEGORY_ACTION_TYPES {
  LoadCategories = '[Category] Load Category',
  LoadCategoriesSuccess = '[Category] Load Category Success',
  LoadCategoriesFailure = '[Category] Load Category Failure',
  AddCategory = '[Category] Add Category',
  AddCategorySuccess = '[Category] Add Category Success',
  AddCategoryFailure = '[Category] Add Category Failure',
  UpdateCategory = '[Category] Update Category',
  UpdateCategorySuccess = '[Category] Update Category Success',
  UpdateCategoryFailure = '[Category] Update Category Failure',
  DeleteCategory = '[Category] Delete Category',
  DeleteCategorySuccess = '[Category] Delete Category Success',
  DeleteCategoryFailure = '[Category] Delete Category Failure',
}
export const loadCategories = createAction(
  CATEGORY_ACTION_TYPES.LoadCategories
);

export const loadCategoriesSuccess = createAction(
  CATEGORY_ACTION_TYPES.LoadCategoriesSuccess,
  props<{ categories: any }>()
);

export const loadCategoriesFailure = createAction(
  CATEGORY_ACTION_TYPES.LoadCategoriesFailure,
  props<{ error: any }>()
);

export const addCategory = createAction(
  CATEGORY_ACTION_TYPES.AddCategory,
  props<{category: Category}>()
);

export const addCategorySuccess = createAction(
  CATEGORY_ACTION_TYPES.AddCategorySuccess,
  props<{ category: Category}>()
)

export const addCategoryFailure = createAction(
  CATEGORY_ACTION_TYPES.AddCategoryFailure,
  props<{error: any}>()
)

export const updateCategory = createAction(
  CATEGORY_ACTION_TYPES.UpdateCategory,
  props<{category: Category, categoryId: String}>()
);

export const updateCategorySuccess = createAction(
  CATEGORY_ACTION_TYPES.UpdateCategorySuccess,
  props<{ category: Update<Category>}>()
)

export const updateCategoryFailure = createAction(
  CATEGORY_ACTION_TYPES.UpdateCategoryFailure,
  props<{error: any}>()
)

export const deleteCategory = createAction(
  CATEGORY_ACTION_TYPES.DeleteCategory,
  props<{categoryId: String}>()
);

export const deleteCategorySuccess = createAction(
  CATEGORY_ACTION_TYPES.DeleteCategorySuccess,
  props<{ categoryId: String}>()
)

export const deleteCategoryFailure = createAction(
  CATEGORY_ACTION_TYPES.DeleteCategoryFailure,
  props<{error: any}>()
)
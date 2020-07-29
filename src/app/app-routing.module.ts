import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';


const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'task', component: CreateTaskComponent  },
  { path: 'category', component: CreateCategoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

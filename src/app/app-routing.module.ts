import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EyTodoLoginComponent } from './components/ey-todo-login/ey-todo-login.component';

const routes: Routes = [
   { path: '', component: HomeComponent },
   { path: 'login', component: EyTodoLoginComponent },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

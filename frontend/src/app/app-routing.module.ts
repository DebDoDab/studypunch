import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeworkComponent } from './homework/homework.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/homework', pathMatch: 'full'},
  { path: 'homework', component: HomeworkComponent},
  { path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

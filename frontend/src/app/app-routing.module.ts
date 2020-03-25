import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeworkComponent } from './homework/homework.component';
import { LoginComponent } from './login/login.component';
import { GroupComponent } from './group/group.component';

const routes: Routes = [
  { path: '', redirectTo: '/homework', pathMatch: 'full' },
  { path: 'homework', component: HomeworkComponent },
  { path: 'login', component: LoginComponent },
  { path: 'group', component: GroupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

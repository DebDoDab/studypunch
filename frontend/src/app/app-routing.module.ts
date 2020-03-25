import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeworkComponent } from './homework/homework.component';
import { LoginComponent } from './login/login.component';
import { GroupsComponent } from './groups/groups.component';

const routes: Routes = [
  { path: '', redirectTo: '/homework', pathMatch: 'full' },
  { path: 'homework', component: HomeworkComponent },
  { path: 'login', component: LoginComponent },
  { path: 'groups', component: GroupsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

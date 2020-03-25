import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './login/login.component';
import { HomeworkComponent } from './homework/homework.component';
import { GroupsComponent } from './groups/groups.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeworkComponent,
    GroupsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

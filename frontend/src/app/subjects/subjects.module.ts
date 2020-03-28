import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectComponent } from './subject/subject.component';
import { SubjectsComponent } from './subjects.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    SubjectComponent,
    SubjectsComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SubjectsModule { }

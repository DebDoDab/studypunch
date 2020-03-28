import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectComponent } from './subject/subject.component';
import { SubjectsComponent } from './subjects.component';
import { RouterModule } from '@angular/router';

import { ApiService } from '../api/api.service';

@NgModule({
  declarations: [
    SubjectsComponent,
    SubjectComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SubjectsComponent,
    SubjectComponent
  ]
})
export class SubjectsModule { }

import { Component, OnInit, Input } from '@angular/core';
import { Homework } from '../../models/homework';
import { FormControl, FormGroup } from '@angular/forms';
import { Alert } from '../../models/alert';
import { ApiService } from 'src/app/api/api.service';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-homework-details',
  templateUrl: './homework-details.component.html',
  styleUrls: ['./homework-details.component.css']
})
export class HomeworkDetailsComponent implements OnInit {
  homework: Homework = new Homework();
  @Input()
  set homeworkset(homework: Homework) {
    this.homework = homework;
    this.homeworkData.setValue({
      name: homework.name,
      description: homework.description,
      isImportant: homework.isImportant,
      deadline: homework.deadline,
      subject: homework.subject
    });
  }
  @Input()
  isEditing: boolean = true;

  homeworkData = new FormGroup({
    name: new FormControl(""),
    description: new FormControl(""),
    isImportant: new FormControl(""),
    deadline: new FormControl(""),
    subject: new FormControl(""),
  });
  alert: Alert = new Alert();

  constructor(
    private api: ApiService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  submit() {
    if (this.isEditing) {
      this.api.patchHomework(this.homework.id, this.homeworkData.value)
      .then(resp => {
        this.homework = resp;
        this.alert.clear();
        this.navigateBack();
      }).catch(error => {
        this.alert.set(error.message, 'danger');
      });
    } else {
      this.api.postHomework(this.homeworkData.value)
        .then(resp => {
          this.homework = resp;
          this.alert.clear();
          this.navigateBack();
        }).catch(error => {
          this.alert.set(error.message, 'danger');
        });
    }
  }

  navigateBack() {
    // this.activeModal.close(this.homework);
  }

}

import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api/api.service';
import { Column } from '../models/column';
import { Homework } from '../models/homework';

@Component({
  selector: 'app-homework',
  templateUrl: './homework.component.html',
  styleUrls: ['./homework.component.css']
})
export class HomeworkComponent implements OnInit {

  homework: Array<Column>;

  constructor(private api : ApiService) {
    this.homework = new Array(4).fill(false).map(() => {
      return new Column();
    });
    console.log(this.homework);
    this.homework[0].title = "< week";
    this.homework[1].title = "< 2 weeks";
    this.homework[2].title = "longterm";
    this.homework[3].title = "expired";
  }

  ngOnInit(): void {
    this.api.getHomework().then(resp => {
      this.divide(resp)
    });
  }

  divide(result: Array<Homework>): void {
    let today = new Date();
    let week = new Date();
    week.setDate(today.getDate() + 7);
    let twoWeeks = new Date();
    twoWeeks.setDate(week.getDate() + 7);

    for (let homework of result) {
      homework.deadline = new Date(homework.deadline);
      console.log("!", today);
      if (homework.deadline <= today) {
        this.homework[3].data.push(homework);
      } else if (homework.deadline <= week) {
        this.homework[0].data.push(homework);
      } else if (homework.deadline <= twoWeeks) {
        this.homework[1].data.push(homework);
      } else {
        this.homework[2].data.push(homework);
      }
    }
  }

}

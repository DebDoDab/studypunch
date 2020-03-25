import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api/api.service';
import { Column } from '../interfaces/column';
import { Homework } from '../interfaces/homework';

@Component({
  selector: 'app-homework',
  templateUrl: './homework.component.html',
  styleUrls: ['./homework.component.css']
})
export class HomeworkComponent implements OnInit {

  homework: Array<Column> = [
    {'title': '< week', 'data': new Array<Homework>()},
    {'title': '< 2 weeks', 'data': new Array<Homework>()},
    {'title': 'longterm', 'data': new Array<Homework>()},
    {'title': 'expired', 'data': new Array<Homework>()},
  ]

  constructor(private api : ApiService) { }

  ngOnInit(): void {
    this.api.getHomework().then(x => this.divide(x['results'])).catch(err => {});
  }

  divide(json: Object): void {
    let result = <Array<Homework>>json;
    let today = new Date();
    let week = new Date();
    week.setDate(today.getDate() + 7);
    let twoWeeks = new Date();
    twoWeeks.setDate(week.getDate() + 7);
    for (let homework of result) {
      if (homework.deadline < today.toISOString().split('T')[0]) {
        this.homework[3].data.push(homework);
      } else if (homework.deadline < week.toISOString().split('T')[0]) {
        this.homework[0].data.push(homework);
      } else if (homework.deadline < twoWeeks.toISOString().split('T')[0]) {
        this.homework[1].data.push(homework);
      } else {
        this.homework[2].data.push(homework);
      }
    }
  }

}

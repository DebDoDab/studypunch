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

  firstColumn: Column = {'title': '< week', 'data': []};
  secondColumn: Column = {'title': '< 2 weeks', 'data': []};
  thirdColumn: Column = {'title': 'longterm', 'data': []};
  forthColumn: Column = {'title': 'expired', 'data': []};

  constructor(private api : ApiService) { }

  ngOnInit(): void {
    this.api.getHomework().then(x => this.divide(x['results']));
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
        this.forthColumn.data.push(homework);
      } else if (homework.deadline < week.toISOString().split('T')[0]) {
        this.firstColumn.data.push(homework);
      } else if (homework.deadline < twoWeeks.toISOString().split('T')[0]) {
        this.secondColumn.data.push(homework);
      } else {
        this.thirdColumn.data.push(homework);
      }
    }
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homework',
  templateUrl: './homework.component.html',
  styleUrls: ['./homework.component.css']
})
export class HomeworkComponent implements OnInit {

  firstColumn = {'title': '< week', 'data': [{'name':'name', 'deadline':12, 'subject':'Math'}]};
  secondColumn = {'title': '< 2 weeks', 'data': []};
  thirdColumn = {'title': 'longterm', 'data': []};
  forthColumn = {'title': 'notes', 'data': []};

  constructor() { }

  ngOnInit(): void {
  }

}

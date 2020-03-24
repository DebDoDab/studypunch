import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Homework, ColumnElement } from './columnElement';

@Component({
  selector: 'app-homework',
  templateUrl: './homework.component.html',
  styleUrls: ['./homework.component.css']
})
export class HomeworkComponent implements OnInit {

  firstColumn = {'title': '< week', 'data': []};
  secondColumn = {'title': '< 2 weeks', 'data': []};
  thirdColumn = {'title': 'longterm', 'data': []};
  forthColumn = {'title': 'notes', 'data': []};

  constructor(private api : ApiService) { }

  ngOnInit(): void {
    this.api.getHomework().subscribe(x => this.divide(x['results']));
  }

  divide(x: JSON): void {
    let a: Object = x;
    this.firstColumn.data = <Array<Homework>>a;
  }

}

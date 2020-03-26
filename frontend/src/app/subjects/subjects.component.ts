import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api/api.service';

import { Subject } from '../models/subject';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {
  subjects: Array<Array<Subject>> = new Array(4).fill(false).map(() => new Array());

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getSubjects().then(resp => {
      this.divide(resp);
    })
  }

  divide(response: Array<Subject>): void {
    let index = 0;
    for (let subject of response) {
      this.subjects[index % 4].push(subject);
      index++;
    }
  }

}

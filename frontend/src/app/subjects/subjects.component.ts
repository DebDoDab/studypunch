import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { CurrentUserService } from '../shared/services/current-user.service';
import { Subject } from '../models/subject';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css'],
})
export class SubjectsComponent implements OnInit {
  subjects: Array<Array<Subject>> = new Array(4).fill(false).map(() => new Array());
  userPipe = CurrentUserService.userPipe;

  constructor(private api: ApiService, private router: Router) {}

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

  addClick() {
    // this.api.printCookies();
  }

  subjectClick(subject: Subject): void {
    this.router.navigateByUrl("subjects/" + subject.id);
  }

  btnClick(subject: Subject): void {
    this.router.navigateByUrl("homework?id=" + subject.id);
  }

}

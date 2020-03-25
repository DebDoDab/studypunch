import { Subject } from './subject';

export class Homework {
  id: number;
  isImportant: boolean;
  deadline: Date;
  subject: Subject;
  name: string;
  descriprion: string;

  constructor() {
    this.id = -1;
    this.isImportant = false;
    this.deadline = new Date(0);
    this.subject = new Subject();
    this.name = "undefined";
    this.descriprion = "";
  }
}

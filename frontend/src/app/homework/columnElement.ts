export interface Homework {
  group: number;
  isImportant: boolean;
  deadline: string;
  subject: number;
  name: string;
  description: string;
  url: string;
}

export interface ColumnElement {
  title: string;
  data: Array<Homework>;
}

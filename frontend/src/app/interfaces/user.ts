export class User {
  group: number;
  email: string;
  id: number;
  username: string;

  constructor(group = -1, email = '', id = -1, username = ':/') {
    this.group = group;
    this.email = email;
    this.id = id;
    this.username = username;
  }
}

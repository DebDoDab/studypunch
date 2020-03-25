export class Alert {
  type: string;
  message: string;
  state: boolean;

  constructor() {
    this.type = 'danger';
    this.message = '';
    this.state = false;
  }

  set(message: string) {
    this.message = message;
    this.state = !!message;
  }

  clear() {
    this.message = '';
    this.state = false;
  }
}

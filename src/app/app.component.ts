import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  localStorage: Storage;
  currentUser = JSON.parse(localStorage.getItem("currentUser"));
  userName: any;
  httpOptions: any;

  constructor() {

  }

  ngOnInit() {
    if (this.currentUser) {
      this.userName = this.currentUser.name;
    }
    ;

  }

}

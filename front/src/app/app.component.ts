import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  localStorage: Storage;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userName: any;
  httpOptions: any;

  constructor(private router: Router) {
  }

  ngOnInit() {
    if (this.currentUser) {
      this.userName = this.currentUser.name;
    }
  }

}

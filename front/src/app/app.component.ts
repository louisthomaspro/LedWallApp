import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

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

  id: string;

  constructor(public router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    if (this.currentUser) {
      this.userName = this.currentUser.name;
    }
    this.id = this.route.snapshot.queryParams['id'];
  }

}

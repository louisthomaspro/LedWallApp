import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { SpecialService } from './services/special.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  localStorage: Storage;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userName: any;

  id: string;

  constructor(
      public router: Router,
      private route: ActivatedRoute,
      private specialService: SpecialService
  )
  {
  }

  ngOnInit() {
    if (this.currentUser) {
      this.userName = this.currentUser.name;
    }
    this.id = this.route.snapshot.queryParams['id'];
  }

  turnOff() {
    this.specialService.turnoff().subscribe();
  }

}

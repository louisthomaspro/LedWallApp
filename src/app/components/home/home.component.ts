import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/users.service';
import {  HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  token: any;
  httpOptions: any;
  registeredUsers: any;
  constructor(private userService: UserService) {
  }

  ngOnInit() {
    if (this.currentUser) {
        this.token = this.currentUser.token;
        this.httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token })
          };
    }
    this.userService.getUsers(this.httpOptions).subscribe((res) => {
      console.log(res);
      this.registeredUsers = res;
    } );
  }


}

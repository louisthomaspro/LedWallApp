import { Component, OnInit } from '@angular/core';
import { UserService } from "./../../services/users.service";
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  localStorage: Storage;
  constructor(private userService: UserService, private router: Router) {

    
   }
 

  ngOnInit() {
    
    if(localStorage.getItem("currentUser")){
      localStorage.removeItem('currentUser');
      this.userService.setCurrentUser('');
    }
  }

  model: any = {};
  message: String;
  onSubmit(form: NgForm) {

    this.userService.login(this.model).subscribe((res) => {
      if (res.success) {
        let currentUser: any = { "name": res.user, "token": res.token }
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        this.userService.setCurrentUser(res.user);
        this.router.navigate(['']);
      } else {
        this.message = res.message;
        form.resetForm();
      }
    }, (err) => {
      this.message = JSON.stringify(err);
    });
  }
}

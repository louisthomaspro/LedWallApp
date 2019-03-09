import { Component, OnInit } from '@angular/core';
import { UserService } from "./../../services/users.service";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor( private userService:UserService) { }

  ngOnInit() {
  }
  model: any = {};
  message:any;
  onSubmit(form:NgForm) {
  this.userService.registerUser(this.model).subscribe((res)=>{
    form.resetForm();
    this.message = res;
});
}
}

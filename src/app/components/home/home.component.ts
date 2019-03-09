import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/users.service';
import {  HttpHeaders} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  token: any;
  httpOptions: any;
  registeredUsers: any;

  fileToUpload: File = null;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    if (this.currentUser) {
        this.token = this.currentUser.token;
        this.httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token })
          };
    }
    // this.userService.getUsers(this.httpOptions).subscribe((res) => {
    //   console.log(res);
    //   this.registeredUsers = res;
    // } );
  }


  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  uploadFileToActivity() {
    this.fileUploadService.postFile(this.fileToUpload).subscribe(data => {
      // do something, if upload success
    }, error => {
      console.log(error);
    });
  }






}

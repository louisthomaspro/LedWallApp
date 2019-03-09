import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../services/users.service';
import {LwFilesService} from '../../services/lw-files.service';
import {Observable} from 'rxjs';
// import {  HttpHeaders} from '@angular/common/http';
// import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  // token: any;
  // httpOptions: any;
  // registeredUsers: any;

  filesGallery: any;

  @ViewChild('form') form;

  constructor(private userService: UserService, private lwImageService: LwFilesService) {
  }

  ngOnInit() {
    // if (this.currentUser) {
    //     this.token = this.currentUser.token;
    //     this.httpOptions = {
    //         headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token })
    //       };
    // }

    this.lwImageService.getFiles().subscribe((res) => {
      console.log(res);
      this.filesGallery = res;
    });
  }


  deleteFiles(id) {
    this.lwImageService.deleteFiles(id).subscribe((res) => {
      console.log(res);
      this.ngOnInit();
    });
  }

  uploadFiles(targetFile) {

    if (targetFile.length > 0) {
      const file: File = targetFile[0];
      this.lwImageService.uploadFiles(file).subscribe((res) => {
        console.log(res);
        this.ngOnInit();
      });

    }



    this.form.nativeElement.reset();
  }






}

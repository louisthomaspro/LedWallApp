import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../services/users.service';
import {PixelArtService} from '../../services/pixelArtService';

import {PixelArtInformationDialogComponent} from '../pixelart-information-dialog/pixel-art-information-dialog.component';
import {MatDialog} from '@angular/material';

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

  pixelArtGalleryGallery: any;

  @ViewChild('form') form;

  constructor(private userService: UserService, private pixelArtService: PixelArtService, public dialog: MatDialog) {
  }

  ngOnInit() {
    // if (this.currentUser) {
    //     this.token = this.currentUser.token;
    //     this.httpOptions = {
    //         headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token })
    //       };
    // }

    this.pixelArtService.getPixelArts().subscribe((res) => {
      console.log(res);
      this.pixelArtGalleryGallery = res;
    });
  }


  deletePixelArt(id) {
    this.pixelArtService.deletePixelArts(id).subscribe((res) => {
      console.log(res);
      this.ngOnInit();
    });
  }

  openPixelArtInformationDialog(pa): void {
    console.log('ici');
    const dialogRef = this.dialog.open(PixelArtInformationDialogComponent, {
      width: '400px',
      data: pa
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  // uploadFiles(targetFile) { // (deprecated)
  //
  //   if (targetFile.length > 0) {
  //     const file: File = targetFile[0];
  //     this.pixelArtService.uploadFiles(file).subscribe((res) => {
  //       console.log(res);
  //       this.ngOnInit();
  //     });
  //
  //   }
  //
  //
  //
  //   this.form.nativeElement.reset();
  // }






}

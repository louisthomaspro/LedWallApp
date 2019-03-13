import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../services/users.service';
import {PixelArtService} from '../../services/pixelArtService';

import {PixelArtInformationDialogComponent} from '../pixelart-information-dialog/pixel-art-information-dialog.component';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';

import {MatDialog, MatSnackBar} from '@angular/material';

import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

import { Pixelart } from '../../pixelart';
import { Animation } from '../../animation';

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

  pixelArtGalleryGallery: Array<Pixelart> = [];

  timeline: Array<Animation> = [];

  sadGifs: Array<string> = [];

  @ViewChild('form') form;


  constructor(private userService: UserService, private pixelArtService: PixelArtService, public dialog: MatDialog, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    // if (this.currentUser) {
    //     this.token = this.currentUser.token;
    //     this.httpOptions = {
    //         headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token })
    //       };
    // }

    this.pixelArtService.getPixelArts().subscribe((res) => {
      // console.log(res);
      this.pixelArtGalleryGallery = res;
    });

    const gifNames = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (const name of gifNames) {
      this.sadGifs.push('assets/gifs/sad/' + name + '.gif');
    }
  }


  addToTimeline(pa) {
    const animationToAdd: Animation = {
      time: 3,
      pixelart: pa
    }
    this.timeline.push(animationToAdd);
  }

  deleteFromTimeline(key) {
    this.timeline.splice(key, 1);
  }


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.timeline, event.previousIndex, event.currentIndex);
  }


  deletePixelArt(id) {
    this.pixelArtService.deletePixelArts(id).subscribe((res) => {
      this.ngOnInit();
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 3000,
    });
  }

  openPixelArtInformationDialog(pa): void {
    const dialogRef = this.dialog.open(PixelArtInformationDialogComponent, {
      width: '400px',
      data: pa
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  confirmDialog(id): void {
    const item = this.sadGifs[Math.floor(Math.random() * this.sadGifs.length)];
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'WARNING', text: 'Are you sure you want to delete this beautiful pixel art ? He will leave us forever ...', gif: item}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
          this.deletePixelArt(id);
          this.openSnackBar('No mercy :\'(');
      }
    });
  }

  runPixelArt(id) {
    this.openSnackBar('RUN FORREST RUN !');
    this.pixelArtService.runPixelArts(id).subscribe((res) => {
      console.log(res);
    });

  }



  // uploadFiles(targetFile) { // (deprecated but maybe usefull for python script ???)
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

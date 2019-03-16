import { Component, OnInit } from '@angular/core';

// Objects
import {PixelArt} from '../../modals/pixelArt';
import {Animation} from '../../modals/animation';

// Angular Modules
import {MatDialog, MatSnackBar} from '@angular/material';

// Components
import {PixelArtInformationDialogComponent} from '../dialog/pixelart-information-dialog/pixel-art-information-dialog.component';
import {ConfirmDialogComponent} from '../dialog/confirm-dialog/confirm-dialog.component';

// Services
import {PixelArtService} from '../../services/pixelArt.service';
import {AnimationService} from '../../services/animation.service';



@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  animationArray: Array<Animation>;
  pixelArtArray: Array<PixelArt> = [];
  sadGifArray: Array<string> = [];




  constructor(
      private pixelArtService: PixelArtService,
      private animationService: AnimationService,
      public dialog: MatDialog, private snackBar: MatSnackBar
  ) { }


  ngOnInit() {

    // Init pixelArtArray
    this.pixelArtService.get().subscribe((res) => {
      this.pixelArtArray = res;
    });

    // Init animatiosnArray
    this.animationService.get().subscribe((res) => {
      this.animationArray = res;
    });

    // Init sad gifs
    const gifNames = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (const name of gifNames) {
      this.sadGifArray.push('assets/gifs/sad/' + name + '.gif');
    }
  }


  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 3000,
    });
  }


  deletePixelArt(id) {
    this.deleteConfirmDialog(id, 'Are you sure you want to delete this beautiful pixel art ? He will leave us forever ...', () => {
      this.pixelArtService.delete(id).subscribe((res) => {
        this.ngOnInit();
      });
    });
  }


  deleteAnimation(id) {
    this.deleteConfirmDialog(id, 'Are you sure you want to delete this beautiful animation ? He will leave us forever ...', () => {
      this.animationService.delete(id).subscribe((res) => {
        this.ngOnInit();
      });
    });
  }



  deleteConfirmDialog(id, msg, callback): void {
    const item = this.sadGifArray[Math.floor(Math.random() * this.sadGifArray.length)];
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'WARNING', text: msg, gif: item}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        callback();
        this.openSnackBar('No mercy :\'(');
      }
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




  runPixelArt(id) {
    this.openSnackBar('RUN FORREST RUN !️');
    this.pixelArtService.run(id).subscribe((res) => {
      console.log(res);
    });
  }


  runAnimation(id) {
    this.openSnackBar('RUN FORREST RUN !️');
    this.animationService.run(id).subscribe((res) => {
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

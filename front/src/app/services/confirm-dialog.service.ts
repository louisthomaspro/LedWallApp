import { Injectable, OnInit } from '@angular/core';
import {ConfirmDialogComponent} from '../components/dialog/confirm-dialog/confirm-dialog.component';
import {MatDialog, MatSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {

  sadGifArray: Array<string> = [];


  constructor(
      public dialog: MatDialog,
      private snackBar: MatSnackBar
  ) {
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

}

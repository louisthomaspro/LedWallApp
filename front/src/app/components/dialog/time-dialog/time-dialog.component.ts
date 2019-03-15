import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  data: any;
}

@Component({
  selector: 'app-time-dialog',
  templateUrl: './time-dialog.component.html',
  styleUrls: ['./time-dialog.component.scss']
})
export class TimeDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TimeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

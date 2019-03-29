import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';


@Component({
  selector: 'app-pixelart-information-dialog',
  templateUrl: './pixel-art-information-dialog.component.html',
  styleUrls: ['./pixel-art-information-dialog.component.scss']
})
export class PixelArtInformationDialogComponent implements OnInit {

  constructor(
      public dialogRef: MatDialogRef<PixelArtInformationDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any)
  {
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

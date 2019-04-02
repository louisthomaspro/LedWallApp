import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as AColorPicker from 'a-color-picker';

import * as $ from 'jquery';

@Component({
  selector: 'app-wordarts',
  templateUrl: './wordarts.component.html',
  styleUrls: ['./wordarts.component.scss']
})
export class WordartsComponent implements OnInit, AfterViewInit {

  bgColor: string;
  fontColor: string;

  textWidth: number;

  constructor() { }

  ngOnInit() {

    AColorPicker.createPicker('.fontPicker')
    .on('change', (picker, color) => {
      this.fontColor = color;
    });

    AColorPicker.createPicker('.bgPicker')
    .on('change', (picker, color) => {
      this.bgColor = color;
    });



  }

  ngAfterViewInit() {
    this.initTextWidth();
  }

  initTextWidth() {
    this.textWidth = -$('#text-preview').width();
    console.log(this.textWidth);
  }

}

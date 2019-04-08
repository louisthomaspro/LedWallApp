import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})




export class NotfoundComponent implements OnInit {

  notFoundGifs: Array<string> = [];
  gif: string;

  constructor() { }

  ngOnInit() {
    const gifNames = [1, 2, 3];
    for (const name of gifNames) {
      this.notFoundGifs.push('assets/gifs/notfound/' + name + '.gif');
    }
    this.gif = this.notFoundGifs[Math.floor(Math.random() * this.notFoundGifs.length)];
  }

}

import { Component, OnInit } from '@angular/core';

import {ControllerService} from '../../services/controller.service';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.scss']
})
export class ControllerComponent implements OnInit {

  constructor(private controllerService: ControllerService) { }

  ngOnInit() {
  }

  sendUp() {
    const res = this.controllerService.up().subscribe();
  }

  sendDown() {
    this.controllerService.down().subscribe();
  }

  sendRight() {
    this.controllerService.right().subscribe();
  }

  sendLeft() {
    this.controllerService.left().subscribe();
  }

}

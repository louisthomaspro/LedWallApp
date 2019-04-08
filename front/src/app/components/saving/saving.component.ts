import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-saving',
  templateUrl: './saving.component.html',
  styleUrls: ['./saving.component.scss']
})
export class SavingComponent implements OnInit {

  saving = false;
  display = false;

  constructor() { }

  ngOnInit() {
  }

  get savingState(): boolean {
    return this.saving;

  }

  set savingState(val: boolean) {
    this.display = true;
    this.saving = val;
  }

}

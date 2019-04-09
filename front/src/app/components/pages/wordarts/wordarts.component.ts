import {
  ChangeDetectorRef,
  Component,
  OnInit,
  DoCheck,
  KeyValueDiffers, ViewChild
} from '@angular/core';
import * as AColorPicker from 'a-color-picker';

import {Wordart} from '../../../models/wordart.model';
import {ActivatedRoute, Router} from '@angular/router';
import {WordartService} from '../../../services/wordart.service';
import {MatSnackBar} from '@angular/material';
import {SavingComponent} from '../../saving/saving.component';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {ConfirmDialogService} from '../../../services/confirm-dialog.service';

import {Location} from '@angular/common';
import {NgModel} from '@angular/forms';


@Component({
  selector: 'app-wordarts',
  templateUrl: './wordarts.component.html',
  styleUrls: ['./wordarts.component.scss']
})
export class WordartsComponent implements OnInit, DoCheck {

  wordart: Wordart;

  changeSubject: Subject<any> = new Subject();
  differ: any;

  @ViewChild('savingComponent') savingComponent: SavingComponent;
  @ViewChild('textInput') textInput: NgModel;

  constructor(
      private cd: ChangeDetectorRef,
      private route: ActivatedRoute,
      private wordartService: WordartService,
      private snackBar: MatSnackBar,
      private differs: KeyValueDiffers,
      private router: Router,
      private confirmDialogService: ConfirmDialogService,
      private location: Location
  ) {
  }

  ngOnInit() {

    const textPicker = AColorPicker.createPicker('.textPicker')
    .on('change', (picker, color) => {
      const colors = AColorPicker.parseColor(color, '{ }');
      this.wordart.textColor = [colors[0], colors[1], colors[2]];
    });

    const bgPicker = AColorPicker.createPicker('.bgPicker')
    .on('change', (picker, color) => {
      const colors = AColorPicker.parseColor(color, '{ }');
      this.wordart.bgColor = [colors[0], colors[1], colors[2]];
    });

    const wordartId = this.route.snapshot.paramMap.get('id');

    // Init animation
    this.wordart = {
      _id: null,
      text: '',
      bgColor: [0, 0, 0],
      textColor: [255, 255, 255]
    };

    textPicker.color = this.wordart.textColor;
    bgPicker.color = this.wordart.bgColor;

    if (wordartId) {
      this.wordartService.getById(wordartId).subscribe((res) => {
        this.wordart = res;
        console.log('Id found !');

        textPicker.color = this.wordart.textColor;
        bgPicker.color = this.wordart.bgColor;
      });
    }


    this.changeSubject.pipe(debounceTime(500)).subscribe(() => {
      this.save();
    });

    this.textInput.control.markAsTouched();

    this.differ = {};
    this.differ['wordart'] = this.differs.find([]).create();
  }

  ngDoCheck() {
    const wordartChange = this.differ['wordart'].diff(this.wordart);
    if (wordartChange && this.wordart.text !== '') {
      this.savingComponent.savingState = true;
      this.changeSubject.next();
    }
  }


  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 3000,
    });
  }


  save() {
    if (this.wordart._id) {
      this.wordartService.update(this.wordart._id, this.wordart).subscribe(
          (res) => {
            console.log('Wordart updated');
          },
          (err) => {
            console.log('An error occurred. Pls contact an administrator.');
          },
          () => {
            this.savingComponent.savingState = false;
          }
      );
    } else {
      this.wordartService.create(this.wordart).subscribe((res) => {
            this.wordart._id = res;
            this.location.replaceState('/wordarts/' + res);
            console.log('Wordart created');
          },
          (err) => {
            console.log('An error occurred. Pls contact an administrator.');
          },
          () => {
            this.savingComponent.savingState = false;
          }
      );
    }
  }


  deleteWordart() {
    this.confirmDialogService.deleteConfirmDialog(this.wordart._id, 'Are you sure you want to delete this wordart ? He will leave us forever ...', () => {
      this.wordartService.delete(this.wordart._id).subscribe((res) => {
        this.router.navigate(['']);
      });
    });
  }


  run() {
    this.openSnackBar('RUN FORREST RUN !️');
    console.log(this.wordart._id);
    this.wordartService.run(this.wordart._id).subscribe((res) => {
      console.log(res);
    });
  }

}

import {Component, OnInit, ViewChild, DoCheck, KeyValueDiffers} from '@angular/core';
import {Pixelart} from '../../../models/pixelart.model';
import {Animation} from '../../../models/animation.model';
import {AnimationItem} from '../../../models/animation-item.model';
import {PixelartService} from '../../../services/pixelart.service';

import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {TimeDialogComponent} from '../../dialog/time-dialog/time-dialog.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {AnimationService} from '../../../services/animation.service';
import {ConfirmDialogService} from '../../../services/confirm-dialog.service';
import {Subject} from 'rxjs';

import {SavingComponent} from '../../saving/saving.component';
import {debounceTime} from 'rxjs/operators';
import {Location} from '@angular/common';
import {FormBuilder, FormGroup, NgModel} from '@angular/forms';

@Component({
  selector: 'app-animation',
  templateUrl: './animations.component.html',
  styleUrls: ['./animations.component.scss']
})
export class AnimationsComponent implements OnInit, DoCheck {

  pixelartArray: Array<Pixelart> = [];
  animation: Animation;
  form: FormGroup;

  changeSubject: Subject<any> = new Subject();
  differ: any;

  @ViewChild('savingComponent') savingComponent: SavingComponent;
  @ViewChild('animationName') animationName: NgModel;

  constructor(
      private pixelartService: PixelartService,
      private animationService: AnimationService,
      private snackBar: MatSnackBar,
      public dialog: MatDialog,
      private route: ActivatedRoute,
      private confirmDialogService: ConfirmDialogService,
      differs: KeyValueDiffers,
      private location: Location,
      private router: Router
  ) {
    this.differ = {};
    this.differ['animation'] = differs.find([]).create();
    this.differ['animationItems'] = differs.find([]).create();
  }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    // Init animation
    this.animation = {
      _id: null,
      name: '',
      animationItems: []
    };
    if (id) {
      this.animationService.getById(id).subscribe((res) => {
        this.animation = res;
        console.log('Id found !');
      });
    }

    // Init pixelartArray
    this.pixelartService.get().subscribe((res) => {
      this.pixelartArray = res;
    });

    this.changeSubject.pipe(debounceTime(500)).subscribe(() => {
      this.save();
    });


    this.animationName.control.markAsTouched();

  }


  ngDoCheck() {
    const animationChange = this.differ['animation'].diff(this.animation) || this.differ['animationItems'].diff(this.animation.animationItems);
    if (animationChange && this.animation.name !== '') {
      this.savingComponent.savingState = true;
      this.changeSubject.next();
    }
  }


  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 3000,
    });
  }


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.animation.animationItems, event.previousIndex, event.currentIndex);
  }

  addToTimeline(pa) {
    const animationToAdd: AnimationItem = {
      time: 3,
      pixelart: pa
    };
    if (!this.animation.animationItems) {
      this.animation.animationItems = [];
    }
    this.animation.animationItems.push(animationToAdd);
  }

  deleteFromTimeline(key) {
    this.animation.animationItems.splice(key, 1);
  }

  openDelayDialog(animation): void {
    const dialogRef = this.dialog.open(TimeDialogComponent, {
      width: '250px',
      data: {time: animation.value.time}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        animation.value.time = result;
      }
    });
  }

  save() {
    if (this.animation._id) {
      this.animationService.update(this.animation._id, this.animation).subscribe(
          (res) => {
            console.log('Animation updated');
          },
          (err) => {
            console.log('An error occurred. Pls contact an administrator.');
          },
          () => {
            this.savingComponent.savingState = false;
          }
      );
    } else {
      this.animationService.create(this.animation).subscribe((res) => {
            this.animation._id = res;
            this.location.replaceState('/animations/' + res);
            console.log('Animation created');
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

  deleteAnimation() {
    this.confirmDialogService.deleteConfirmDialog(this.animation._id, 'Are you sure you want to delete this beautiful obj ? He will leave us forever ...', () => {
      this.animationService.delete(this.animation._id).subscribe((res) => {
        this.router.navigate(['']);
      });
    });
  }


}

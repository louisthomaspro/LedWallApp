import { Component, OnInit } from '@angular/core';
import {PixelArt} from '../../modals/pixelArt';
import {Animation} from '../../modals/animation';
import {AnimationItem} from '../../modals/animationItem';
import {PixelArtService} from '../../services/pixelArt.service';

import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {TimeDialogComponent} from '../dialog/time-dialog/time-dialog.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {AnimationService} from '../../services/animation.service';

@Component({
  selector: 'app-animation',
  templateUrl: './animations.component.html',
  styleUrls: ['./animations.component.scss']
})
export class AnimationsComponent implements OnInit {

  pixelArtArray: Array<PixelArt> = [];
  timeline: Animation;
  animationId: string;

  constructor(
      private pixelArtService: PixelArtService,
      private animationService: AnimationService,
      private snackBar: MatSnackBar,
      public dialog: MatDialog,
      private route: ActivatedRoute
  ) { }

  ngOnInit() {

    const animationId = this.route.snapshot.queryParams['id'];

    // Init timeline
    this.timeline = {
      name: 'New Animation',
      animationItems: []
    };
    if (animationId) {
      this.animationService.getById(animationId).subscribe((res) => {
        this.timeline = res;
        this.animationId = res._id;
        console.log('Id found ! Loading ' + res.name);
        console.log(this.timeline);
      });
    }

    // Init pixelArtArray
    this.pixelArtService.get().subscribe((res) => {
      this.pixelArtArray = res;
    });


  }


  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 3000,
    });
  }


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.timeline.animationItems, event.previousIndex, event.currentIndex);
  }

  addToTimeline(pa) {
    const animationToAdd: AnimationItem = {
      time: 3,
      pixelArt: pa
    }
    this.timeline.animationItems.push(animationToAdd);
  }

  deleteFromTimeline(key) {
    this.timeline.animationItems.splice(key, 1);
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

  saveAnimation() {
    if (this.animationId) {
      this.animationService.update(this.animationId, this.timeline).subscribe((res) => {
        // console.log(res);
      });
    } else {
      this.animationService.create(this.timeline).subscribe((res) => {
        this.animationId = res;
      });
    }
  }

}

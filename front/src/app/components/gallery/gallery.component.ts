import {Component, OnInit, ViewChild} from '@angular/core';

// Objects
import {Pixelart} from '../../models/pixelart.model';
import {Animation} from '../../models/animation.model';
import {Script} from '../../models/script.model';
import {Wordart} from '../../models/wordart.model';

// Angular Modules
import {MatDialog, MatSnackBar} from '@angular/material';

// Components
import {PixelArtInformationDialogComponent} from '../dialog/pixelart-information-dialog/pixel-art-information-dialog.component';
import {ConfirmDialogComponent} from '../dialog/confirm-dialog/confirm-dialog.component';

// Services
import {PixelartService} from '../../services/pixelart.service';
import {AnimationService} from '../../services/animation.service';
import {ScriptService} from '../../services/script.service';
import {WordartService} from '../../services/wordart.service';
import {DomSanitizer} from '@angular/platform-browser';



@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  animationArray: Array<Animation> = [];
  pixelartArray: Array<Pixelart> = [];
  wordartArray: Array<Wordart> = [];
  scriptArray: Array<Script> = [];

  sadGifArray: Array<string> = [];

  @ViewChild('form') form;




  constructor(
      private pixelartService: PixelartService,
      private animationService: AnimationService,
      private scriptService: ScriptService,
      private wordartService: WordartService,
      public dialog: MatDialog, private snackBar: MatSnackBar,
      private sanitizer: DomSanitizer
  ) { }


  ngOnInit() {

    // Init arrays
    this.pixelartService.get().subscribe((res) => {
      this.pixelartArray = res;
    });
    this.animationService.get().subscribe((res) => {
      this.animationArray = res;
    });
    this.wordartService.get().subscribe((res) => {
      this.wordartArray = res;
    });
    this.scriptService.get().subscribe((res) => {
      this.scriptArray = res;
    });

    const gifNames = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (const name of gifNames) {
      this.sadGifArray.push('assets/gifs/sad/' + name + '.gif');
    }
  }


  animationBackground(animation: Animation): Object {
    let backgroundImage = '';
    let i = 0;
    for (const animationItem of animation.animationItems) {
      i++;
      backgroundImage += 'url(' + animationItem.pixelart.base64Thumb + '),';
      if (i >= 4) {
        break;
      }
    }
    return this.sanitizer.bypassSecurityTrustStyle(backgroundImage.substring(0, backgroundImage.length - 1));
  }



    scriptBackground(script: Script): Object {
        let image = '';
        switch (script.extension) {
            case 'py': {
                image = 'assets/img/scripts/python.png';
                break;
            }

            default: {
                image = '';
                break;
            }
        }
        const backgroundImage = 'url(' + image + '),';

        return this.sanitizer.bypassSecurityTrustStyle(backgroundImage.substring(0, backgroundImage.length - 1));
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



  openPixelArtInformationDialog(pa): void {
    const dialogRef = this.dialog.open(PixelArtInformationDialogComponent, {
      width: '400px',
      data: pa
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }



  uploadScript(targetFile) {

    if (targetFile.length > 0) {
      const file: File = targetFile[0];
      this.scriptService.upload(file).subscribe((res) => {
        console.log(res);
        this.ngOnInit();
      });

    }

    this.form.nativeElement.reset();
  }





  /* DELETE */

  deletePixelArt(id) {
    this.deleteConfirmDialog(id, 'Are you sure you want to delete this beautiful pixel art ? He will <u>also be deleted in the animations in which it appears.</u><br>In conclusion, he will leave us forever ...', () => {
      this.pixelartService.delete(id).subscribe((res) => {
        this.ngOnInit();
      });
    });
  }

  deleteAnimation(id) {
    this.deleteConfirmDialog(id, 'Are you sure you want to delete this beautiful obj ? He will leave us forever ...', () => {
      this.animationService.delete(id).subscribe((res) => {
        this.ngOnInit();
      });
    });
  }

  deleteScript(id) {
    this.deleteConfirmDialog(id, 'Are you sure you want to delete this script ? He will leave us forever ...', () => {
      this.scriptService.delete(id).subscribe((res) => {
        this.ngOnInit();
      });
    });
  }

  deleteWordart(id) {
    this.deleteConfirmDialog(id, 'Are you sure you want to delete this wordart ? He will leave us forever ...', () => {
      this.wordartService.delete(id).subscribe((res) => {
        this.ngOnInit();
      });
    });
  }



  /* RUN */

  runPixelart(id) {
    this.openSnackBar('RUN FORREST RUN !️');
    this.pixelartService.run(id).subscribe((res) => {
      console.log(res);
    });
  }

  runAnimation(id) {
    this.openSnackBar('RUN FORREST RUN !️');
    this.animationService.run(id).subscribe((res) => {
      console.log(res);
    });
  }

  runScript(id) {
    this.openSnackBar('RUN FORREST RUN !️');
    this.scriptService.run(id).subscribe((res) => {
      console.log(res);
    });
  }

  runWordart(id) {
    this.openSnackBar('RUN FORREST RUN !️');
    this.wordartService.run(id).subscribe((res) => {
      console.log(res);
    });
  }

}

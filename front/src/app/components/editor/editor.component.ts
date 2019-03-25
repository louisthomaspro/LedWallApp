import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PixelartService} from '../../services/pixelart.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  loadAPI: Promise<any>;
  @ViewChild('iframe') iframe: ElementRef;

  pixelart: any;
  pixelartId: string;

  constructor(private route: ActivatedRoute, private pixelartService: PixelartService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    const pixelartId = this.route.snapshot.queryParams['id'];
    if (pixelartId) {
      this.pixelartId = pixelartId;
      this.pixelartService.getById(pixelartId).subscribe((res) => {
        this.pixelart = res;
        console.log('Id found ! Loading ' + res.piskel.name);
      });
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 3000,
    });
  }

  public iframeLoaded() {

    setTimeout( () => {
      if (this.pixelart) {
        this.loadSprite(this.pixelart);
      }
    }, 1000 );

  }

  public loadSprite(sprite) {
    const contentWindow = this.iframe.nativeElement.contentWindow;
    const pskl = contentWindow.pskl;
    if (!pskl) {
      this.openSnackBar('An error occured... CODE : 241');
    } else {
      const fps = sprite.piskel.fps;
      const id = this.pixelartId;
      const piskel = sprite.piskel;
      const descriptor = new pskl.model.piskel.Descriptor(piskel.name, piskel.description, true);
      pskl.utils.serialization.Deserializer.deserialize(sprite, function (piskel) {
        piskel.setDescriptor(descriptor);
        piskel.setId(id);
        pskl.app.piskelController.setPiskel(piskel);
        pskl.app.previewController.setFPS(fps);
      });
    }
  }

  // init();
}

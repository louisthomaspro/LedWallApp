import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PixelArtService} from '../../services/pixelArt.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  loadAPI: Promise<any>;
  @ViewChild('iframe') iframe: ElementRef;

  pixelArt: any;
  pixelArtId: string;

  constructor(private route: ActivatedRoute, private pixelArtService: PixelArtService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    const pixelArtId = this.route.snapshot.queryParams['id'];
    if (pixelArtId) {
      this.pixelArtId = pixelArtId;
      this.pixelArtService.getById(pixelArtId).subscribe((res) => {
        this.pixelArt = res;
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
      if (this.pixelArt) {
        this.loadSprite(this.pixelArt);
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
      const id = this.pixelArtId;
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

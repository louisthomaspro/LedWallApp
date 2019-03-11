import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PixelArtService} from '../../services/pixelArtService';
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
  id: string;

  constructor(private route: ActivatedRoute, private pixelArtService: PixelArtService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    const id = this.route.snapshot.queryParams['id'];
    if (id) {
      this.id = id;
      this.pixelArtService.getPixelArtsById(id).subscribe((res) => {
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
    if (this.pixelart) {
      setTimeout( () => { this.loadSprite(this.pixelart); }, 1000 );
    }
  }

  public loadSprite(sprite) {
    const contentWindow = this.iframe.nativeElement.contentWindow;
    const pskl = contentWindow.pskl;
    if (!pskl) {
      this.openSnackBar('An error occured... CODE : 241');
    } else {
      const fps = sprite.piskel.fps;
      const id = this.id;
      const piskel = sprite.piskel;
      const descriptor = new pskl.model.piskel.Descriptor(piskel.name, piskel.description, true);
      pskl.utils.serialization.Deserializer.deserialize(sprite, function (piskel) {
        piskel.setDescriptor(descriptor);
        piskel.setId(id);
        pskl.app.piskelController.setPiskel(piskel);
        pskl.app.previewController.setFPS(fps);
      });
    }
  };

  // init();





}

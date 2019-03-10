import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PixelArtService} from '../../services/pixelArtService';

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

  constructor(private route: ActivatedRoute, private pixelArtService: PixelArtService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.queryParams['id'];
    console.log(id);
    if (id) {
      this.id = id;
      this.pixelArtService.getPixelArtsById(id).subscribe((res) => {
        this.pixelart = res;
        console.log(res);
      });
    }
  }


  public iframeLoaded() {
    if (this.pixelart) {
      setTimeout( () => { this.loadSprite(this.pixelart); }, 1000 );
    }
  }

  public loadSprite(sprite) {
    const contentWindow = this.iframe.nativeElement.contentWindow;
    console.log(contentWindow);
    const pskl = contentWindow.pskl;
    console.log(pskl);
    if (pskl) {
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

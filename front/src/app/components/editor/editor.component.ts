import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, AfterViewInit {

  loadAPI: Promise<any>;
  @ViewChild('iframe') iframe: ElementRef;

  pixelart: any;

  constructor() {
  }

  ngOnInit() {
    this.pixelart = {"modelVersion":2,"piskel":{"name":"Mario kart","description":"","fps":3,"height":10,"width":16,"layers":["{\"name\":\"Layer 1\",\"frameCount\":1,\"base64PNG\":\"data:image/png;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD//gATQ3JlYXRlZCB3aXRoIEdJTVD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wgARCAAKABADAREAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAAB//EABgBAQADAQAAAAAAAAAAAAAAAAYCAwUH/9oADAMBAAIQAxAAAAEOmhTEPExut6u6A3//xAAcEAACAAcAAAAAAAAAAAAAAAACBAABAwUGETP/2gAIAQEAAQUCXCe0ROhclYxrt//EACARAAICAQQDAQAAAAAAAAAAAAECAxEhAAUiQQQSMTT/2gAIAQMBAT8B3OEp4cjSoEjEUZVvULyIS+VcjRc0SezWMeU6TbfM6tY6zdZHf3P3ORddafW+/mbX/8QAIhEAAQMDAwUAAAAAAAAAAAAAAQIRIQADEgQiQQUxMjNC/9oACAECAQE/AUXEv7GLqeew3SxcBolq6Au3qNJfuIVkn5nIjcnky58pkZY8Umrdf//EACMQAAECBAYDAAAAAAAAAAAAAAIBEgARISIEEBMjMTJBgfD/2gAIAQEABj8CDZcjQajey0pT3GDAh0znfIWotpePuMhj/8QAGhAAAwADAQAAAAAAAAAAAAAAAREhABBBMf/aAAgBAQABPyFMRpK8eyEt9YUmQRQWGIgZIa7nOr//2gAMAwEAAgADAAAAEL0//8QAGREAAwEBAQAAAAAAAAAAAAAAAREhMQAQ/9oACAEDAQE/EKA2HnMLoAWE15oS6aCQyJYMwP8AXf/EABkRAQEAAwEAAAAAAAAAAAAAAAERACExEP/aAAgBAgEBPxASRw3vPRQaJUcGiiYEhagzKzIqJOgHjxn/xAAbEAEBAAIDAQAAAAAAAAAAAAABEQAhMaGxwf/aAAgBAQABPxB51za2ACXAhXMiCDECy1cASC9yePhndPc//9k=\"}"]}};
  }



  ngAfterViewInit() {
    // this.loadSprite(this.pixelart);
  }

  public iframeLoaded() {
    setTimeout( () => { this.loadSprite(this.pixelart); }, 1000 );
  }

  public loadSprite(sprite) {
    const contentWindow = this.iframe.nativeElement.contentWindow;
    console.log(contentWindow);
    const iframeloader = contentWindow.iframeloader;
    console.log(iframeloader);
    const pskl = contentWindow.pskl;
    console.log(pskl);
    if (pskl) {
      const fps = sprite.piskel.fps;
      const piskel = sprite.piskel;
      const descriptor = new pskl.model.piskel.Descriptor(piskel.name, piskel.description, true);
      pskl.utils.serialization.Deserializer.deserialize(sprite, function (piskel) {
        piskel.setDescriptor(descriptor);
        pskl.app.piskelController.setPiskel(piskel);
        pskl.app.previewController.setFPS(fps);
      });
    }
  };

  // init();





}

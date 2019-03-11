import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PixelArtInformationDialogComponent } from './pixel-art-information-dialog.component';

describe('PixelArtInformationDialogComponent', () => {
  let component: PixelArtInformationDialogComponent;
  let fixture: ComponentFixture<PixelArtInformationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PixelArtInformationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PixelArtInformationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

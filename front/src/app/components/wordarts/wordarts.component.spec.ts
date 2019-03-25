import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordartsComponent } from './wordarts.component';

describe('WordartsComponent', () => {
  let component: WordartsComponent;
  let fixture: ComponentFixture<WordartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

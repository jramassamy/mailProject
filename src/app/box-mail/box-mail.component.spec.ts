import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxMailComponent } from './box-mail.component';

describe('BoxMailComponent', () => {
  let component: BoxMailComponent;
  let fixture: ComponentFixture<BoxMailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxMailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

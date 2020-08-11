import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedLocationViewComponent } from './selected-location-view.component';

describe('SelectedLocationViewComponent', () => {
  let component: SelectedLocationViewComponent;
  let fixture: ComponentFixture<SelectedLocationViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedLocationViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedLocationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

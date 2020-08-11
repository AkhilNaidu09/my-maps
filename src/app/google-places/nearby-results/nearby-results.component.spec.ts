import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NearbyResultsComponent } from './nearby-results.component';

describe('NearbyResultsComponent', () => {
  let component: NearbyResultsComponent;
  let fixture: ComponentFixture<NearbyResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearbyResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NearbyResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

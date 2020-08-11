import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NearbySearchBoxComponent } from './nearby-search-box.component';

describe('NearbySearchBoxComponent', () => {
  let component: NearbySearchBoxComponent;
  let fixture: ComponentFixture<NearbySearchBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearbySearchBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NearbySearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

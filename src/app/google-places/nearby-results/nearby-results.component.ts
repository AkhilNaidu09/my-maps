import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-nearby-results',
  templateUrl: './nearby-results.component.html',
  styleUrls: ['./nearby-results.component.scss']
})
export class NearbyResultsComponent implements OnInit {
  @Output() onSelectLocation: EventEmitter<any> = new EventEmitter();
  @Input('nearByResults') nearByResults: any[];
  constructor() { }

  ngOnInit(): void {
  }

  onSeletctNearBy(data) {
    this.onSelectLocation.emit(data);
  }

  /**
   * Following method will generates an array to loop and bind the rating in DOM (all the decimal rating will be rounded here)
   *
   * @param {number} i
   * @returns
   * @memberof GooglePlacesComponent
   */
  counter(i: number) {
    return new Array(Math.round(i));
  }
}

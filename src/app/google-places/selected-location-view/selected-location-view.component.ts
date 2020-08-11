import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-selected-location-view',
  templateUrl: './selected-location-view.component.html',
  styleUrls: ['./selected-location-view.component.scss']
})
export class SelectedLocationViewComponent implements OnInit {
  @Input('selectedPlace') selectedPlace: any;
  @Input('selectedLocationUrls') selectedLocationUrls: any[];

  constructor() { }

  ngOnInit(): void {
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


/// <reference types="@types/googlemaps" />

import { Component, OnInit, NgZone, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-location-search',
  templateUrl: './location-search.component.html',
  styleUrls: ['./location-search.component.scss']
})
export class LocationSearchComponent implements OnInit {
  public placeOptions: BehaviorSubject<google.maps.places.AutocompletePrediction[]>;
  private autocompleteService: google.maps.places.AutocompleteService;
  public addressSearch: string = '';
  @ViewChild('addressInputAutocomplete') addressInputAutocomplete: ElementRef;
  @Output() onSelectedLocation: EventEmitter<any> = new EventEmitter();
  @Output() onHoverLocation: EventEmitter<any> = new EventEmitter();
  constructor(private zone: NgZone) {
    this.placeOptions = new BehaviorSubject([]);
  }

  ngOnInit(): void {
  }

  /**
 * Retrieves search predections (a custom autocomplete)
 *
 * @memberof GooglePlacesComponent
 */
  getLocationPredictions() {
    if (this.addressSearch.length) {
      this.autocompleteService.getPlacePredictions({ input: this.addressSearch }, (results) => {
        this.zone.run(() => { this.placeOptions.next(results); });
      });
    } else {
      this.placeOptions.next([]);
    }
  }

  placeSelected(event) {
    this.onSelectedLocation.emit(event);
  }
  onHover(state) {
    this.onHoverLocation.emit(state);
  }
  public displayFn(option: google.maps.places.AutocompletePrediction) {
    return option ? option.description : '';
  }

  ngAfterViewInit() {
    this.autocompleteService = new google.maps.places.AutocompleteService();
    setTimeout(() => {
      this.addressInputAutocomplete.nativeElement.focus();
    }, 0)
  }
}

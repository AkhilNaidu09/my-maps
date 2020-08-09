/// <reference types="@types/googlemaps" />

import { Component, ViewChild, OnInit, AfterViewInit, NgZone, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';

export interface State {
  description: string;
}
@Component({
  selector: 'AutocompleteComponent',
  templateUrl: './google-places.component.html',
  styleUrls: ['./google-places.component.scss']
})
export class GooglePlacesComponent implements OnInit, AfterViewInit {
  public placeOptions: BehaviorSubject<google.maps.places.AutocompletePrediction[]>;
  private autocompleteService: google.maps.places.AutocompleteService;
  public addressSearch: string = '';
  @ViewChild('addressInputAutocomplete') addressInput: ElementRef;
  items = [{ title: 'Slide 1', image: '' }, { title: 'Slide 2', image: '' }, { title: 'Slide 3', image: '' }];

  lat: any;
  lng: any;
  showFiller = false;
  selectedPlace: any;
  selectedLocationUrls: any[] = [];
  constructor(private zone: NgZone) {
    this.placeOptions = new BehaviorSubject([]);
  }

  public displayFn(option: google.maps.places.AutocompletePrediction) {
    return option ? option.description : '';
  }

  ngOnInit() {

  }

  onHover(data) {
    this.initialize(data.place_id);

  }

  searchData() {
    if (this.addressSearch.length) {
      this.autocompleteService.getPlacePredictions({ input: this.addressSearch }, (results) => {

        this.zone.run(() => { this.placeOptions.next(results); });
        //    this.placeOptions.next(results);
      });

    } else {
      this.placeOptions.next([]);
    }
  }

  public placeSelected(place) {
    this.selectedPlace = place?.option?.value;
    this.initialize(this.selectedPlace.place_id);
  }

  ngAfterViewInit() {
    this.autocompleteService = new google.maps.places.AutocompleteService();

    if (navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.lng = +pos.coords.longitude;
        this.lat = +pos.coords.latitude;
      });
    }
    this.initialize('ChIJdd_ytSbL4BQRWDUgd6Myndo');

  }

  initialize(placeId) {
    var _this = this;
    _this.selectedLocationUrls = [];
    var map = new google.maps.Map(
      document.getElementById("map_canvas"), {
      center: new google.maps.LatLng(37.4419, -122.1419),
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    var request = {
      placeId: placeId
    };

    var infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);

    service.getDetails(request, function (place, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        var photos = place.photos;
        var urls = []; // we will store the urls here
        if (photos) {
          photos.forEach((photo) => {
            urls.push(photo.getUrl({
              maxWidth: 500, // at least set one or the other - mandatory
              maxHeight: undefined
            }));
          });
          if (urls) {
            _this.selectedPlace = place;
            _this.selectedLocationUrls = urls;
          }
        }
        else {
          _this.selectedLocationUrls.push('https://i.ytimg.com/vi/ZG4JQX4BO9A/maxresdefault.jpg');

        }

        google.maps.event.addListener(marker, 'click', function () {
          let content = `<div class="poi-info-window gm-style">
          <div>
              <div class="title full-width">${place.name}</div>
              <div class="address">
                 ${place.adr_address}
              </div>
          </div>
      
      </div>`;
          infowindow.setContent(content);
          infowindow.open(map, this);
        });
        // infowindow.open(map, marker);
        map.fitBounds(place.geometry.viewport);
      }
    });

  }

  counter(i: number) {
    return new Array(Math.round(i));
  }

}
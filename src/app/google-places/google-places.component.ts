/// <reference types="@types/googlemaps" />

import { Component, ViewChild, OnInit, AfterViewInit, NgZone, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'AutocompleteComponent',
  templateUrl: './google-places.component.html',
  styleUrls: ['./google-places.component.scss']
})
export class GooglePlacesComponent implements OnInit, AfterViewInit {
  public placeOptions: BehaviorSubject<google.maps.places.AutocompletePrediction[]>;
  private autocompleteService: google.maps.places.AutocompleteService;
  public addressSearch: string = '';
  public nearByType: string = '';
  lat: any;
  lng: any;

  selectedPlace: any = null;
  selectedLocationUrls: any[] = [];
  nearByResults: any;
  selectedTab: number = 0;

  constructor(private zone: NgZone) {
    this.placeOptions = new BehaviorSubject([]);
  }

  public displayFn(option: google.maps.places.AutocompletePrediction) {
    return option ? option.description : '';
  }

  ngOnInit() {

  }

  /**
   * On hover predictions list, this method will points the locations
   *
   * @param {*} data
   * @memberof GooglePlacesComponent
   */
  onHover(data) {
    this.initialize(data.place_id);
  }

  onSeletctNearBy(data) {
    this.initialize(data.place_id);
    this.selectedTab = 0;
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

  nearBySearch() {
    const request = {
      location: new google.maps.LatLng(this.lat, this.lng),
      radius: 5000,
      type: this.nearByType ? this.nearByType : 'restaurant'
    };

    const places = document.getElementById("map_canvas") as HTMLDivElement;
    const service = new google.maps.places.PlacesService(places);
    var _this = this;
    service.nearbySearch(request, function (place, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        _this.zone.run(() => { _this.nearByResults = place; });
      } else {
        _this.zone.run(() => { _this.nearByResults = []; });
      }
    });

  }

  /**
   * on Selecting location from autocomplete list
   *
   * @param {*} place
   * @memberof GooglePlacesComponent
   */
  public placeSelected(place) {
    this.selectedPlace = place?.option?.value;
    this.initialize(this.selectedPlace.place_id);
  }

  /**
   * Maps script will takes time load. to make sure, initiate maps rendering in afterview init
   *
   * @memberof GooglePlacesComponent
   */
  ngAfterViewInit() {
    this.autocompleteService = new google.maps.places.AutocompleteService();

    // poping-up allow location to get current location of user, currently not using anywhere **TODO
    if (navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.lng = +pos.coords.longitude;
        this.lat = +pos.coords.latitude;
      });
    }

    // Initiating maps with a static placeId, we can do this dynamically as well by poping-up allow location in broswer side.
    this.initialize('ChIJdd_ytSbL4BQRWDUgd6Myndo');

  }

  /**
   * Initiate maps (or) loadMaps based on placeId
   *
   * @param {*} placeId
   * @memberof GooglePlacesComponent
   */
  initialize(placeId) {
    // Since google maps api is an ansynchronous call, 
    // I was unable to get the components scope (using this), so I'm Initializing this to a variable and using it inside promise response
    var _this = this;
    _this.selectedLocationUrls = [];
    _this.selectedPlace = null;

    // following code will renders map to specified DOM element
    var map = new google.maps.Map(
      document.getElementById("map_canvas"), {
      center: new google.maps.LatLng(37.4419, -122.1419),
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    var request = {
      placeId: placeId
    };

    // inofWinow will be useful to show some basic details of Marker (Selected/search location details)
    var infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);

    // This is core part of logic, which gets specific place/loction details
    // like Location points, address, communication detils, photo urls, reviews,ratings etc
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
          // if images for location is unavailable, binding a generic image.
          _this.selectedLocationUrls.push('https://i.ytimg.com/vi/ZG4JQX4BO9A/maxresdefault.jpg');

        }

        // clicl event will be fired once user selects/clicks on marker value
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
        map.fitBounds(place.geometry.viewport);
      }
    });

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

  getCategories(): string[] {
    return ["accounting", "airport", "amusement_park", "aquarium", "art_gallery", "atm", "bakery", "bank", "bar", "beauty_salon", "bicycle_store", "book_store", "bowling_alley", "bus_station", "cafe", "campground", "car_dealer", "car_rental", "car_repair", "car_wash", "casino", "cemetery", "church", "city_hall", "clothing_store", "convenience_store", "courthouse", "dentist", "department_store", "doctor", "drugstore", "electrician", "electronics_store", "embassy", "fire_station", "florist", "funeral_home", "furniture_store", "gas_station", "gym", "hair_care", "hardware_store", "hindu_temple", "home_goods_store", "hospital", "insurance_agency", "jewelry_store", "laundry", "lawyer", "library", "light_rail_station", "liquor_store", "local_government_office", "locksmith", "lodging", "meal_delivery", "meal_takeaway", "mosque", "movie_rental", "movie_theater", "moving_company", "museum", "night_club", "painter", "park", "parking", "pet_store", "pharmacy", "physiotherapist", "plumber", "police", "post_office", "primary_school", "real_estate_agency", "restaurant", "roofing_contractor", "rv_park", "school", "secondary_school", "shoe_store", "shopping_mall", "spa", "stadium", "storage", "store", "subway_station", "supermarket", "synagogue", "taxi_stand", "tourist_attraction", "train_station", "transit_station", "travel_agency", "university", "veterinary_care", "zoo"];
  }

}
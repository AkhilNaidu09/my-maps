/// <reference types="@types/googlemaps" />

import { Component, OnInit, NgZone, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nearby-search-box',
  templateUrl: './nearby-search-box.component.html',
  styleUrls: ['./nearby-search-box.component.scss']
})
export class NearbySearchBoxComponent implements OnInit {
  public nearByType: string = '';
  lat: any;
  lng: any;
  @Output() onSearchNearBy: EventEmitter<any> = new EventEmitter();
  constructor(private zone: NgZone) {
  }

  ngOnInit(): void {
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
        _this.zone.run(() => {
          _this.onSearchNearBy.emit(place);

        });
      } else {
        _this.zone.run(() => {
          _this.onSearchNearBy.emit([]);
        });
      }
    });

  }

  ngAfterViewInit() {
    // poping-up allow location to get current location of user, currently not using anywhere **TODO
    if (navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.lng = +pos.coords.longitude;
        this.lat = +pos.coords.latitude;
      });
    }
  }

  getCategories(): string[] {
    return ["accounting", "airport", "amusement_park", "aquarium", "art_gallery", "atm", "bakery", "bank", "bar", "beauty_salon", "bicycle_store", "book_store", "bowling_alley", "bus_station", "cafe", "campground", "car_dealer", "car_rental", "car_repair", "car_wash", "casino", "cemetery", "church", "city_hall", "clothing_store", "convenience_store", "courthouse", "dentist", "department_store", "doctor", "drugstore", "electrician", "electronics_store", "embassy", "fire_station", "florist", "funeral_home", "furniture_store", "gas_station", "gym", "hair_care", "hardware_store", "hindu_temple", "home_goods_store", "hospital", "insurance_agency", "jewelry_store", "laundry", "lawyer", "library", "light_rail_station", "liquor_store", "local_government_office", "locksmith", "lodging", "meal_delivery", "meal_takeaway", "mosque", "movie_rental", "movie_theater", "moving_company", "museum", "night_club", "painter", "park", "parking", "pet_store", "pharmacy", "physiotherapist", "plumber", "police", "post_office", "primary_school", "real_estate_agency", "restaurant", "roofing_contractor", "rv_park", "school", "secondary_school", "shoe_store", "shopping_mall", "spa", "stadium", "storage", "store", "subway_station", "supermarket", "synagogue", "taxi_stand", "tourist_attraction", "train_station", "transit_station", "travel_agency", "university", "veterinary_care", "zoo"];
  }

}

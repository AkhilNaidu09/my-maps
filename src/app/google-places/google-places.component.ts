/// <reference types="@types/googlemaps" />

import { Component, OnInit, AfterViewInit, ViewChild, HostListener } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'AutocompleteComponent',
  templateUrl: './google-places.component.html',
  styleUrls: ['./google-places.component.scss']
})
export class GooglePlacesComponent implements OnInit, AfterViewInit {
  @ViewChild(MatDrawer) public drawer: MatDrawer
  selectedPlace: any = null;
  selectedLocationUrls: any[] = [];
  nearByResults: any;
  selectedTab: number = 0;
  screenHeight: number;
  screenWidth: number;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.onResize();
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

  onSelectNearBy(data) {
    this.initialize(data.place_id);
    this.selectedTab = 0;
  }

  /**
   * on Selecting location from autocomplete list
   *
   * @param {*} place
   * @memberof GooglePlacesComponent
   */
  public placeSelected(place) {
    const isSmallScreen = this.breakpointObserver.isMatched('(max-width: 599px)');
    if (isSmallScreen) {
      this.drawer.toggle()
    }
    this.selectedPlace = place?.option?.value;
    this.initialize(this.selectedPlace.place_id);
  }

  /**
   * Maps script will takes time load. to make sure, initiate maps rendering in afterview init
   *
   * @memberof GooglePlacesComponent
   */
  ngAfterViewInit() {

    // Initiating maps with a static placeId, we can do this dynamically as well by poping-up allow location in broswer side.
    this.initialize('ChIJdd_ytSbL4BQRWDUgd6Myndo');

  }

  setNearbyResults(event) {
    this.nearByResults = event;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    const isSmallScreen = this.breakpointObserver.isMatched('(max-width: 599px)')
    if (!isSmallScreen) {
      this?.drawer?.open();
    }
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
}
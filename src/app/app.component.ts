import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
export class GeoMapAddress {
  mailingAddress1: string = '';
  mailingAddress2: string = '';
  city: string = '';
  state: string = '';
  zip1: string = '';
  zip4: string = '';
  constructor() {

  }
}

declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  address: Object;
  establishmentAddress: Object;

  formattedAddress: string;
  formattedEstablishmentAddress: string;

  phone: string;

  constructor(public zone: NgZone) { }

  getAddress(place: object) {
    this.address = place['formatted_address'];
    this.phone = this.getPhone(place);
    this.formattedAddress = place['formatted_address'];
    this.zone.run(() => this.formattedAddress = place['formatted_address']);
  }
  getAddrComponent(place, componentTemplate) {
    let result;

    for (let i = 0; i < place.address_components.length; i++) {
      const addressType = place.address_components[i].types[0];
      if (componentTemplate[addressType]) {
        result = place.address_components[i][componentTemplate[addressType]];
        return result;
      }
    }
    return;
  }

  getPhone(place) {
    const COMPONENT_TEMPLATE = { formatted_phone_number: 'formatted_phone_number' },
      phone = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return phone;
  }


}

import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { DeliveryService } from '../delivery.service';
import { Geo } from '../delivery-class/geo';
import { Address } from '../delivery-class/address';
import { Delivery } from '../delivery-class/delivery';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-delivery-create',
  templateUrl: './delivery-create.component.html',
  styleUrls: ['./delivery-create.component.css']
})
export class DeliveryCreateComponent implements OnInit {

  private URL: String = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
  private ADDRESS: String = '';
  private KEY: String = '&key=AIzaSyAYJPMvFIHcWvJDFErkBgS7dOMdqxFt9tg';
  private deliveries: Delivery[] = [];
  private geo;
  private address;
  private delivery;

  @ViewChild('inputNameCustomer') inputNameCustomer: ElementRef;
  @ViewChild('inputWeight') inputWeight: ElementRef;
  @ViewChild('inputAddress') inputAddress: ElementRef;
  @ViewChild('inputLon') inputLon: ElementRef;
  @ViewChild('inputLat') inputLat: ElementRef;

  constructor(private deliveriesService: DeliveryService, private http: Http) { }

  ngOnInit() {
    this.deliveriesService.eventEmitterSelect.subscribe(
      data => {
        this.deliveries = data;
      });

    this.deliveriesService.getAllDeliveries();
  }

  onFindLocation() {
    this.ADDRESS = this.inputAddress.nativeElement.value;
    this.http.get(`${this.URL} ${this.ADDRESS} ${this.KEY}`)
        .map(data => data.json())
        .subscribe(data => {
            if (data.results[0].address_components.length < 7) {
                console.log(data);
            } else {
              const lat = data.results[0].geometry.location.lat;
              const lon = data.results[0].geometry.location.lng;

              let street = '';
              let numberHouse = 0;
              let neighborhood = '';
              const complement = '';
              let city = '';
              let state = '';
              let country = '';

              for (let i = 0; i < data.results[0].address_components.length; i++) {
                const arg = data.results[0].address_components[i];
                if (arg.types[0] === 'route') {
                  street = data.results[0].address_components[i].short_name;
                } else if (arg.types[0] === 'street_number') {
                  // tslint:disable-next-line:radix
                  numberHouse = parseInt(data.results[0].address_components[i].short_name);
                } else if (arg.types[0] === 'political' &&
                           arg.types[1] === 'sublocality' &&
                           arg.types[2] === 'sublocality_level_1') {
                  neighborhood = data.results[0].address_components[i].short_name;
                } else if (arg.types[0] === 'administrative_area_level_2' &&
                           arg.types[1] === 'political') {
                  city = data.results[0].address_components[i].short_name;
                } else if (arg.types[0] === 'administrative_area_level_1' &&
                           arg.types[1] === 'political') {
                  state = data.results[0].address_components[i].long_name;
                } else if (arg.types[0] === 'country' &&
                           arg.types[1] === 'political') {
                  country = data.results[0].address_components[i].short_name;
                }
              }
              this.geo = new Geo(lat, lon);
              this.address = new Address(
                                  street,
                                  numberHouse,
                                  neighborhood,
                                  complement,
                                  city,
                                  state,
                                  country,
                                  this.geo
                                );
              this.inputLat.nativeElement.value = lat;
              this.inputLon.nativeElement.value = lon;
            }
        });
  }

  onSubmit(form) {
    this.delivery = new Delivery(4, form.value.customerName, form.value.weight, this.address);
    this.deliveriesService.saveDelivery(this.delivery);
    this.inputNameCustomer.nativeElement.value = '';
    this.inputWeight.nativeElement.value = '';
    this.inputAddress.nativeElement.value = '';
    this.inputLat.nativeElement.value = '';
    this.inputLon.nativeElement.value = '';
  }

  onDelRegister() {
    this.deliveriesService.delAllDeliveries();
  }

}

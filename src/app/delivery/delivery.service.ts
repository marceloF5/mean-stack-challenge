import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';

import { Geo } from './delivery-class/geo';
import { Address } from './delivery-class/address';
import { Delivery } from './delivery-class/delivery';

@Injectable()
export class DeliveryService {

  private geos: Geo[] = [];
  private addresses: Address[] = [];
  private deliveries: Delivery[] = [];

  eventEmitterDelete = new EventEmitter();
  eventEmitterCreate = new EventEmitter();
  eventEmitterSelect = new EventEmitter<Delivery[]>();

  constructor(private http: Http) {

  }

  getAllDeliveries() {
    this.http
      .get('/delivery')
      .map(data => data.json())
      .subscribe(data => {
        console.log(data);
        this.eventEmitterSelect.emit(data);
      });
  }

  saveDelivery(delivery) {
    this.http
        .post('/delivery', delivery)
        .map(data => data.json())
        .subscribe(data => {
          this.eventEmitterCreate.emit();
        });
  }

  delAllDeliveries() {
    this.http
        .delete('/delivery')
        .map(data => data.json())
        .subscribe(data => {
          this.eventEmitterDelete.emit();
        });
  }

}

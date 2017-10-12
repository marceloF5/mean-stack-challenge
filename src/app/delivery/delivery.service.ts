import { Injectable, EventEmitter } from '@angular/core';

import { Geo } from './delivery-class/geo';
import { Address } from './delivery-class/address';
import { Delivery } from './delivery-class/delivery';



@Injectable()
export class DeliveryService {

  private geos: Geo[] = [];
  private addresses: Address[] = [];
  private deliveries: Delivery[] = [];

  eventEmitterDelete = new EventEmitter<Delivery[]>();
  eventEmitterCreate = new EventEmitter<Delivery[]>();

  constructor() {

  }

  getAllDeliveries() {
    return this.deliveries;
  }

  saveDelivery(delivery) {
    this.deliveries.push(delivery);
    this.eventEmitterCreate.emit(this.deliveries);
  }

  delAllDeliveries() {
    console.log(this.deliveries);
    this.deliveries = [];
    this.eventEmitterDelete.emit(this.deliveries);
  }

}

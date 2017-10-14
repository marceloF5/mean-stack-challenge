import { Component, OnInit } from '@angular/core';

import { DeliveryService } from '../delivery.service';
import { Maker } from '../delivery-class/maker';


@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.css']
})
export class DeliveryListComponent implements OnInit {

  private lat = -23.5498772;
  private lng = -46.6339869;
  private deliveries: any[] = [];
  private totalCustomers = 0;
  private totalWeight = 0;
  private avg = 0;
  private zoom = 10;

  private makers: Maker[] = [];

  constructor(private deliveriesService: DeliveryService) {

  }

  ngOnInit() {

    this.deliveriesService.eventEmitterDelete.subscribe(
      data => {
        console.log('ENTROU NO DELETE');
        this.deliveries = [];
        this.makers = [];
        this.totalWeight = 0;
        this.totalCustomers = 0;
        this.avg = 0;
      });

    this.deliveriesService.eventEmitterSelect.subscribe(
      data => {
        console.log('ENTROU NO SELECT');
        console.log(data[1]);
        console.log(data.data.length);
        this.deliveries = data.data;
        this.totalCustomers = this.deliveries.length;
        this.totalWeight = 0;
        for (let i = 0; i < this.deliveries.length; i++) {
          // tslint:disable-next-line:radix
          this.totalWeight += parseInt(this.deliveries[i].weight);
          this.makers.push({name: this.deliveries[i].customerName,
                             lat: this.deliveries[i].address.geo.lat,
                             lon: this.deliveries[i].address.geo.lon,
                             draggable: false});

        }
        this.avg = this.totalWeight / this.totalCustomers;
      });

    this.deliveriesService.eventEmitterCreate.subscribe(
      data => {
        console.log('ENTROU NO CREATE');
        this.deliveriesService.getAllDeliveries();
      });

    this.deliveriesService.getAllDeliveries();
  }

}
